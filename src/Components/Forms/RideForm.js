import { Add, AirlineSeatReclineExtra, Close, CloudSync, CloudUpload, Delete, Route } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Badge, Box, Button, Card, CardContent, CardHeader, Checkbox, Fab, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, Slide, Stack, TextField, Typography, Zoom, styled, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useApi from "Components/Hooks/useApi";
import useRideApi from "Components/Hooks/useRideApi";
import MapsApiLoader from "Components/MapItems/MapsApiLoader";
import PlaceAutocomplete from "Components/MapItems/PlaceAutocomplete";
import RidePublishMapView from "Components/MapItems/RidePublishMapView";
import { ID_RIDE_FROM, ID_RIDE_TO, ID_WAYP_LOCATION, MIN_DELAY_FOR_BOOKING, PREFERENCES, PRICE_SUGGESTIONS, ROUTE_HOME, ROUTE_RIDES, ROUTE_VEHICLE_ADD } from "Store/constants";
import { selectUser } from "Store/selectors";
import { calculatePriceRange, formatPlaceObj, getPriceFromDistance, isEmptyString, isFalsy, isNumeric, showError, showSuccess, unformatPlaceObj } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";



// const minDateTime = new Date(new Date().getTime() + (MIN_DELAY_FOR_BOOKING * 60 * 1000));
const minDateTime = new Date();

const StyledBadge = styled(Badge)(({ isvisible }) => ({
    '& .MuiBadge-badge': {
        marginTop: "7px",
        marginRight: "7px",
        zIndex: 1100,
        width: "10px",
        height: '10px',
        borderRadius: '50%',
        display: isvisible === "true" ? '' : 'none !important',
    },
}));

const DEFAULT_PRICE_HELPER_TEXT = { color: 'text.secondary', text: "Please enter pickup and dropoff locations first" };

function RideForm({ isNew = false }) {

    // #################################################### STATES ####################################################

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { rideId } = useParams();
    const user = useSelector(selectUser);
    const { loading, getVehicles } = useApi();
    const { loading: updating, updateRide, getRideDetails, publishRide } = useRideApi();
    const nav = useNavigate();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const [priceRange, setPriceRange] = useState(null);
    const [priceHelperText, setPriceHelperText] = useState(DEFAULT_PRICE_HELPER_TEXT);
    // const range = [
    //     7, 8.2, 9.4, 10.6, 11.8, 13
    //     x-30%, x-18%, x-6%, x+6%, x+18%, x+30%
    // ]

    // Ride States
    const [locations, setLocations] = useState({});
    const [departureDatetime, setDepartureDatetime] = useState(null);
    const [totalPrice, setTotalPrice] = useState('');
    const [waypoints, setWaypoints] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleOptions, setVehicleOptions] = useState([]);
    const [totalEmptySeats, setTotalEmptySeats] = useState('');
    const [mapState, setMapState] = useState(null);
    const [preferences, setPreferences] = useState([]);

    // Error States
    const [locationErrors, setLocationErrors] = useState({});
    const [datetimeError, setDatetimeError] = useState('');
    const [journeyPriceError, setJourneyPriceError] = useState('');
    const [waypointErrors, setWaypointErrors] = useState({});
    const [vehicleError, setVehicleError] = useState('');
    const [emptySeatsError, setEmptySeatsError] = useState('');


    // #################################################### VISIBILITY HANDLERS ####################################################

    const handleShowMap = () => {
        setIsMapVisible(true);
        setShowNoti(false);
    }
    const handleHideMap = () => {
        setIsMapVisible(false);
    }

    // #################################################### RIDE EDIT HANDLERS ####################################################

    const syncRide = () => {
        getRideDetails(rideId).then(rideDetails => {
            if (rideDetails.publisher._id !== user._id) {
                showError({ message: "You do not have access to modify this ride" }).then(() => nav(ROUTE_HOME));
                return;
            }
            setTotalPrice(rideDetails.totalPrice);
            setDepartureDatetime(new Date(rideDetails.departureDatetime));
            setTotalEmptySeats(rideDetails.totalEmptySeats);
            setVehicleId(rideDetails.vehicle._id);
            setPreferences(rideDetails.preferences || []);
            setLocations({
                [ID_RIDE_FROM]: unformatPlaceObj(rideDetails.from),
                [ID_RIDE_TO]: unformatPlaceObj(rideDetails.to),
            })
            if (rideDetails.waypoints.length > 0) {
                const oldWaypoints = rideDetails.waypoints.map(wayp => {
                    wayp = unformatPlaceObj(wayp);
                    wayp = { location: { ...wayp }, place_id: wayp.place_id };
                    return wayp;
                });
                setWaypoints(oldWaypoints);
            }
        }).catch(err => showError({ message: err.message }));
    }
    const handleUpdate = () => {
        let isValid = true;

        // Validations
        {
            // Locations
            const newLocationErrors = { ...locationErrors };
            if (isFalsy(locations[ID_RIDE_FROM])) {
                newLocationErrors[ID_RIDE_FROM] = 'Please enter a valid departure location';
                isValid = false;
            }
            if (isFalsy(locations[ID_RIDE_TO])) {
                newLocationErrors[ID_RIDE_TO] = 'Please enter a valid destination location';
                isValid = false;
            }
            setLocationErrors(newLocationErrors);

            // Waypoints
            const newWaypointErrors = { ...waypointErrors };
            waypoints.forEach((waypoint, index) => {
                if (isFalsy(waypoint[ID_WAYP_LOCATION])) {
                    newWaypointErrors[index][ID_WAYP_LOCATION] = 'Please enter a valid stopover point';
                    isValid = false;
                }
                // if (isFalsy(waypoint[ID_WAYP_PRICE])) {
                //     newWaypointErrors[index][ID_WAYP_PRICE] = 'Please enter a valid price';
                //     isValid = false;
                // }
            })
            setWaypointErrors(newWaypointErrors);


            // Other Validations
            if (!mapState) {
                isValid = false;
            } else {
                // Extra Imp info like distance and duration from state
            }
            if (isFalsy(totalPrice)) {
                setJourneyPriceError('Please enter a valid journey price');
                isValid = false;
            }
            if (!departureDatetime || new Date(departureDatetime).getTime() < minDateTime.getTime()) {
                setDatetimeError('Please enter a valid departure datetime');
                isValid = false;
            }
            if (isEmptyString(vehicleId)) {
                setVehicleError('Please select a vehicle');
                isValid = false;
            }
            if (isEmptyString(totalEmptySeats)) {
                setEmptySeatsError('You must carry atleast 1 passenger');
                isValid = false;
            }
        }


        if (!isValid) return;
        const from = formatPlaceObj(locations[ID_RIDE_FROM]);
        from.geometry = mapState.legs[0].start_location.toJSON();
        const to = formatPlaceObj(locations[ID_RIDE_TO]);
        to.geometry = mapState.legs[mapState.legs.length - 1].end_location.toJSON();

        const payload = {
            from: JSON.stringify(from),
            to: JSON.stringify(to),
            departureDatetime,
            totalPrice,
            vehicleId,
            totalEmptySeats,
            polyline: mapState.overview_polyline,
            preferences: JSON.stringify(preferences),
        }
        if (waypoints.length > 0) {
            const formattedWaypoints = waypoints.map(waypoint => (formatPlaceObj(waypoint.location)));
            mapState.legs.forEach((leg, legIndex) => {
                if (legIndex === 0) return;
                formattedWaypoints[legIndex - 1].geometry = leg.start_location.toJSON();
            })
            payload['waypoints'] = JSON.stringify(formattedWaypoints);
        }
        const distanceInMeters = mapState.legs.reduce((distance, leg) => distance + leg.distance.value, 0);
        payload.totalDistance = parseFloat((distanceInMeters / 1000).toFixed(2));
        payload.totalDuration = mapState.legs.reduce((durationInSec, leg) => durationInSec + leg.duration.value, 0);
        payload.bounds = JSON.stringify(mapState.bounds);
        // console.log(payload);
        // Submit the Form
        updateRide(rideId, payload).then(ack => {
            showSuccess({ message: ack.message }).then(() =>
                nav(`${ROUTE_RIDES}/${rideId}`)
            )
        }).catch(err => {
            showError({ message: err.message })
        })
    }

    // #################################################### HANDLERS ####################################################

    const handleLocationChange = (newLocation, field) => {
        if (!isEmptyString(newLocation)) {
            setLocationErrors({ ...locationErrors, [field]: '' })
        }
        setLocations({ ...locations, [field]: newLocation });
        setShowNoti(true);
    }
    const handleWaypointDetailsChange = (newValue, field, index) => {
        if (newValue && (!isEmptyString(newValue.description))) {
            setWaypointErrors({
                ...waypointErrors,
                [index]: {
                    ...waypointErrors[index],
                    [field]: ''
                }
            })
            setShowNoti(true);
        }
        const newWaypoints = [...waypoints];
        newWaypoints[index][field] = newValue;
        setWaypoints(newWaypoints);
    }
    const handleAddWaypoint = () => {
        setWaypoints([...waypoints, { place_id: crypto.randomUUID() }])
        setWaypointErrors({ ...waypointErrors, [waypoints.length]: {} });
    }
    const handleDeleteWaypoint = (index) => {
        // console.log(waypoints[index]);
        if (waypoints[index]["location"]) {
            setShowNoti(true);
        }
        setWaypoints([...waypoints.slice(0, index), ...waypoints.slice(index + 1)])
        const newWaypointErrors = { ...waypointErrors };
        if (index >= 0 && index < Object.keys(newWaypointErrors).length) {
            // Remove the item at the specified index
            delete newWaypointErrors[index];

            // Shift greater index items to previous positions
            for (let i = index + 1; i < Object.keys(newWaypointErrors).length + 1; i++) {
                newWaypointErrors[i - 1] = newWaypointErrors[i];
                delete newWaypointErrors[i];
            }
        }
        // console.log(waypointErrors, newWaypointErrors);
        setWaypointErrors(newWaypointErrors);
    }
    const handleSubmit = () => {
        let isValid = true;

        // Validations
        {
            // Locations
            const newLocationErrors = { ...locationErrors };
            if (isFalsy(locations[ID_RIDE_FROM])) {
                newLocationErrors[ID_RIDE_FROM] = 'Please enter a valid departure location';
                isValid = false;
            }
            if (isFalsy(locations[ID_RIDE_TO])) {
                newLocationErrors[ID_RIDE_TO] = 'Please enter a valid destination location';
                isValid = false;
            }
            setLocationErrors(newLocationErrors);

            // Waypoints
            const newWaypointErrors = { ...waypointErrors };
            waypoints.forEach((waypoint, index) => {
                if (isFalsy(waypoint[ID_WAYP_LOCATION])) {
                    newWaypointErrors[index][ID_WAYP_LOCATION] = 'Please enter a valid stopover point';
                    isValid = false;
                }
                // if (isFalsy(waypoint[ID_WAYP_PRICE])) {
                //     newWaypointErrors[index][ID_WAYP_PRICE] = 'Please enter a valid price';
                //     isValid = false;
                // }
            })
            setWaypointErrors(newWaypointErrors);


            // Other Validations
            if (!mapState) {
                isValid = false;
            } else {
                // Extra Imp info like distance and duration from state
            }
            if (isFalsy(totalPrice)) {
                setJourneyPriceError('Please enter a valid journey price');
                isValid = false;
            } else if (totalPrice < priceRange[0] || totalPrice > priceRange[5]) {
                if (totalPrice < priceRange[0]) {
                    setPriceHelperText({ text: `Price too low. Enter between ₹${priceRange[0]} to ₹${priceRange[5]}`, color: 'error' });
                }
                else if (totalPrice > priceRange[5]) {
                    setPriceHelperText({ text: `Price too high. Enter between ₹${priceRange[0]} to ₹${priceRange[5]}`, color: 'error' });
                }
                isValid = false;
            }
            if (!departureDatetime || new Date(departureDatetime).getTime() < minDateTime.getTime()) {
                setDatetimeError('Please enter a valid departure datetime');
                isValid = false;
            }
            if (isEmptyString(vehicleId)) {
                setVehicleError('Please select a vehicle');
                isValid = false;
            }
            if (isEmptyString(totalEmptySeats)) {
                setEmptySeatsError('You must carry atleast 1 passenger');
                isValid = false;
            }
        }


        if (!isValid) return;
        const from = formatPlaceObj(locations[ID_RIDE_FROM]);
        from.geometry = mapState.legs[0].start_location.toJSON();
        const to = formatPlaceObj(locations[ID_RIDE_TO]);
        to.geometry = mapState.legs[mapState.legs.length - 1].end_location.toJSON();

        const payload = {
            from: JSON.stringify(from),
            to: JSON.stringify(to),
            departureDatetime,
            totalPrice,
            vehicleId,
            totalEmptySeats,
            polyline: mapState.overview_polyline,
            // mapState: JSON.stringify(mapState.legs),
            preferences: JSON.stringify(preferences),
        }
        if (waypoints.length > 0) {
            // const formattedWaypoints = waypoints.map(waypoint => ({ ...formatPlaceObj(waypoint.location), price: waypoint.price }));
            const formattedWaypoints = waypoints.map(waypoint => formatPlaceObj(waypoint.location));
            mapState.legs.forEach((leg, legIndex) => {
                if (legIndex === 0) return;
                formattedWaypoints[legIndex - 1].geometry = leg.start_location.toJSON();
            })
            payload['waypoints'] = JSON.stringify(formattedWaypoints);
        }
        const distanceInMeters = mapState.legs.reduce((distance, leg) => distance + leg.distance.value, 0);
        payload.totalDistance = parseFloat((distanceInMeters / 1000).toFixed(2));
        payload.totalDuration = mapState.legs.reduce((durationInSec, leg) => durationInSec + leg.duration.value, 0);
        payload.bounds = JSON.stringify(mapState.bounds);


        // Submit the Form
        // console.log(payload);
        publishRide(payload).then(ack => {
            showSuccess({ message: ack.message }).then(() =>
                nav(ROUTE_RIDES)
            )
        }).catch(err => {
            showError({ message: err.message })
        })
    }

    // const fillSampleData = () => {
    //     setShowNoti(true);
    //     setLocations({
    //         [ID_RIDE_FROM]: {
    //             "description": "Ahmedabad Railway Station, Sakar Bazzar, Kalupur, Ahmedabad, Gujarat, India",
    //             "matched_substrings": [
    //                 {
    //                     "length": 4,
    //                     "offset": 0
    //                 }
    //             ],
    //             "place_id": "ChIJE98lnFyFXjkRgd4qrHpon2o",
    //             "reference": "ChIJE98lnFyFXjkRgd4qrHpon2o",
    //             "structured_formatting": {
    //                 "main_text": "Ahmedabad Railway Station",
    //                 "main_text_matched_substrings": [
    //                     {
    //                         "length": 4,
    //                         "offset": 0
    //                     }
    //                 ],
    //                 "secondary_text": "Sakar Bazzar, Kalupur, Ahmedabad, Gujarat, India"
    //             },
    //             "terms": [
    //                 {
    //                     "offset": 0,
    //                     "value": "Ahmedabad Railway Station"
    //                 },
    //                 {
    //                     "offset": 27,
    //                     "value": "Sakar Bazzar"
    //                 },
    //                 {
    //                     "offset": 41,
    //                     "value": "Kalupur"
    //                 },
    //                 {
    //                     "offset": 50,
    //                     "value": "Ahmedabad"
    //                 },
    //                 {
    //                     "offset": 61,
    //                     "value": "Gujarat"
    //                 },
    //                 {
    //                     "offset": 70,
    //                     "value": "India"
    //                 }
    //             ],
    //             "types": [
    //                 "point_of_interest",
    //                 "establishment"
    //             ]
    //         },
    //         [ID_RIDE_TO]: {
    //             "description": "Surat Railway Station, Railway Station Area, Varachha, Surat, Gujarat, India",
    //             "matched_substrings": [
    //                 {
    //                     "length": 5,
    //                     "offset": 0
    //                 }
    //             ],
    //             "place_id": "ChIJ15BXB1xP4DsRbbuh8F31RrE",
    //             "reference": "ChIJ15BXB1xP4DsRbbuh8F31RrE",
    //             "structured_formatting": {
    //                 "main_text": "Surat Railway Station",
    //                 "main_text_matched_substrings": [
    //                     {
    //                         "length": 5,
    //                         "offset": 0
    //                     }
    //                 ],
    //                 "secondary_text": "Railway Station Area, Varachha, Surat, Gujarat, India"
    //             },
    //             "terms": [
    //                 {
    //                     "offset": 0,
    //                     "value": "Surat Railway Station"
    //                 },
    //                 {
    //                     "offset": 23,
    //                     "value": "Railway Station Area"
    //                 },
    //                 {
    //                     "offset": 45,
    //                     "value": "Varachha"
    //                 },
    //                 {
    //                     "offset": 55,
    //                     "value": "Surat"
    //                 },
    //                 {
    //                     "offset": 62,
    //                     "value": "Gujarat"
    //                 },
    //                 {
    //                     "offset": 71,
    //                     "value": "India"
    //                 }
    //             ],
    //             "types": [
    //                 "lodging",
    //                 "point_of_interest",
    //                 "establishment"
    //             ]
    //         },
    //     })
    //     // setWaypoints([
    //     //     {
    //     //         place_id: crypto.randomUUID(),
    //     //         location: { description: "Surat, Gujarat, India" },
    //     //         price: 1500
    //     //     },
    //     // ])
    //     setTotalPrice(5000);
    //     setDepartureDatetime(new Date(Date.now() + (5 * 60 * 60 * 1000)))
    //     setTotalEmptySeats(3)
    // }

    // #################################################### USEEFFECTS ####################################################

    useEffect(() => {
        if (isNew) return;

        syncRide();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNew])

    useEffect(() => {
        // const prices = getPricePrediction(3600);
        // const priceStructure = {
        //     price: 10000,
        //     min: 7000,
        //     max: 13000,
        //     zones: [7000, 8200, 9400, 10600, 11800, 13000]
        // }
        getVehicles().then(vehicles => {
            setVehicleOptions(vehicles);
        }).catch(err => {
            console.error(err.message);
            setVehicleError('Error loading vehicle options');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!mapState) {
            setPriceRange(null);
            setPriceHelperText(DEFAULT_PRICE_HELPER_TEXT);
            return;
        }

        const distanceInMeters = mapState.legs.reduce((distance, leg) => distance + leg.distance.value, 0);
        const pricePerKm = getPriceFromDistance(distanceInMeters / 1000);
        const priceAnchor = pricePerKm * distanceInMeters / 1000;

        const newPriceRange = calculatePriceRange(priceAnchor);
        setPriceRange(newPriceRange);
        setPriceHelperText({ text: `Enter between ${newPriceRange[0]} to ${newPriceRange[5]}` });
    }, [mapState]);

    useEffect(() => {
        if (!priceRange || !totalPrice) return;

        if (totalPrice < priceRange[0]) {
            setPriceHelperText({ text: `Price too low. Enter between ₹${priceRange[0]} to ₹${priceRange[5]}`, color: 'error' });
        }
        else if (totalPrice > priceRange[5]) {
            setPriceHelperText({ text: `Price too high. Enter between ₹${priceRange[0]} to ₹${priceRange[5]}`, color: 'error' });
        } else {
            let i = 0;
            while (i < priceRange.length - 2 && !(totalPrice >= priceRange[i] && totalPrice < priceRange[i + 1])) {
                i++;
            }

            if (i !== 2) {
                const suggestions = {
                    color: PRICE_SUGGESTIONS[i].color,
                    text: `${PRICE_SUGGESTIONS[i].text}. Enter between ${priceRange[2]} to ${priceRange[3]}`
                };
                setPriceHelperText(suggestions);
            } else {
                setPriceHelperText({ ...PRICE_SUGGESTIONS[i] });
            }
        }
    }, [totalPrice, priceRange]);

    return (<Box position={'absolute'} height={'100%'} width={'100%'}>
        <MapsApiLoader>
            <Box display={'flex'} width={'100%'} height={'100%'}>
                <Box width={'100%'} maxWidth={'600px'} sx={{ overflowX: 'hidden' }}>
                    <Stack width={'100%'} p={4} pb={6} spacing={4} mx={'auto'} minHeight={'100%'}>
                        <Typography variant="h2" textAlign={'center'} color={'primary'}>
                            Publish
                            <Box component={"span"} color={"secondary.main"}> a </Box>
                            Ride
                        </Typography>
                        {/* <Button onClick={fillSampleData} variant="outlined">Fill Sample Data</Button> */}
                        <Box width={'100%'} display={'flex'} gap={3} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
                            <PlaceAutocomplete
                                label='Pickup'
                                placeholder="Exact Starting Location"
                                fullWidth
                                value={locations[ID_RIDE_FROM] || ''}
                                onChange={newValue => handleLocationChange(newValue, ID_RIDE_FROM)}
                                error={!isFalsy(locationErrors[ID_RIDE_FROM])}
                                helperText={locationErrors[ID_RIDE_FROM]}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddWaypoint}
                        >
                            Add Intermediate Stops
                        </Button>
                        {waypoints.map((waypoint, index) =>
                            <Box width={'100%'} gap={{ xs: 2, sm: 2, md: 3 }} display={'flex'} alignItems={'center'} key={waypoint.place_id}>
                                <Box width={'100%'}>
                                    <PlaceAutocomplete
                                        label={`Stopover ${index + 1}`}
                                        placeholder="City/State"
                                        fullWidth
                                        value={waypoint[ID_WAYP_LOCATION] || ''}
                                        onChange={newValue => handleWaypointDetailsChange(newValue, ID_WAYP_LOCATION, index)}
                                        error={!isFalsy(waypointErrors[index]?.[ID_WAYP_LOCATION])}
                                        helperText={waypointErrors[index]?.[ID_WAYP_LOCATION]}
                                        noValidate
                                    />
                                </Box>

                                {/* <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={{ xs: 1, sm: 2 }}>
                                    <TextField
                                        label='Price'
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            min: 0,
                                            step: 1,
                                        }}
                                        value={waypoint[ID_WAYP_PRICE] || ''}
                                        onChange={e => handleWaypointDetailsChange(parseInt(e.target.value) || "", ID_WAYP_PRICE, index)}
                                        error={!isFalsy(waypointErrors[index]?.[ID_WAYP_PRICE])}
                                        helperText={waypointErrors[index]?.[ID_WAYP_PRICE]}
                                    />
                                </Stack> */}
                                <IconButton onClick={e => handleDeleteWaypoint(index)} size="small">
                                    <Delete />
                                </IconButton>
                            </Box>
                        )}
                        <Box width={'100%'} display={'flex'} gap={3} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
                            <PlaceAutocomplete
                                label='Dropoff location'
                                placeholder="Exact Ending Location"
                                fullWidth
                                value={locations[ID_RIDE_TO] || ''}
                                onChange={newValue => handleLocationChange(newValue, ID_RIDE_TO)}
                                error={!isFalsy(locationErrors[ID_RIDE_TO])}
                                helperText={locationErrors[ID_RIDE_TO]}
                            />
                        </Box>
                        <LocalizationProvider adapterLocale={inLocale} dateAdapter={AdapterDateFns}>
                            <MobileDateTimePicker
                                slotProps={{
                                    textField: {
                                        error: !isEmptyString(datetimeError),
                                        helperText: datetimeError
                                    },
                                }}
                                label='Departure Datetime'
                                minDateTime={minDateTime}
                                disablePast
                                value={departureDatetime}
                                onAccept={datetime => {
                                    if (new Date(datetime) < minDateTime) {
                                        setDatetimeError(`Minimum datetime must be ${MIN_DELAY_FOR_BOOKING / 60} hours from now`)
                                    } else {
                                        setDatetimeError('');
                                        setDepartureDatetime(datetime);
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            label='Journey Price'
                            fullWidth
                            helperText={journeyPriceError ||
                                <Typography variant="body2" color={priceHelperText?.color}> {priceHelperText?.text}</Typography>}
                            error={!isEmptyString(journeyPriceError)}
                            disabled={!Boolean(priceRange)}
                            value={totalPrice}
                            onChange={e => {
                                if (isEmptyString(e.target.value)) {
                                    setTotalPrice('');
                                    return;
                                }
                                const price = parseInt(e.target.value);
                                if (isNumeric(price)) {
                                    setTotalPrice(price);
                                    setJourneyPriceError('');
                                }
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                min: 0,
                                step: 1
                            }}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                            }}
                        />

                        <Box>
                            <FormControl fullWidth required>
                                <InputLabel id="vehicle" error={!isEmptyString(vehicleError)}>Vehicle</InputLabel>
                                <Select
                                    labelId="vehicle"
                                    label="Vehicle"
                                    value={vehicleId}
                                    onChange={(e) => {
                                        setVehicleError('');
                                        setVehicleId(e.target.value);
                                    }}
                                    error={!isEmptyString(vehicleError)}
                                >
                                    {vehicleOptions.map((vehicle, index) => (
                                        <MenuItem key={index} value={vehicle._id}>
                                            <Box display={'flex'} alignItems={'center'} columnGap={2}>
                                                <Box borderRadius={'50%'} bgcolor={vehicle.color?.value} height={'19px'} width={'19px'}></Box>
                                                {vehicle.model}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error={!isEmptyString(vehicleError)}>
                                    {vehicleError}
                                </FormHelperText>
                            </FormControl>
                            <Typography textAlign={'right'} color={'InactiveCaptionText'}>
                                Can't find your vehicle? <Box component={Link} sx={{ textDecoration: 'none' }} to={ROUTE_VEHICLE_ADD} color="secondary.main">Add new</Box>
                            </Typography>
                        </Box>

                        <TextField
                            label='How many passengers can you carry?'
                            fullWidth
                            helperText={emptySeatsError}
                            error={!isEmptyString(emptySeatsError)}
                            value={totalEmptySeats}
                            onChange={e => {
                                if (isEmptyString(e.target.value)) {
                                    setTotalEmptySeats('');
                                    return;
                                }
                                const seats = parseInt(e.target.value);
                                if (isNumeric(seats) && seats > 0) {
                                    setTotalEmptySeats(seats);
                                    setEmptySeatsError('');
                                }
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                min: 1,
                                step: 1
                            }}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AirlineSeatReclineExtra /></InputAdornment>
                            }}
                        />

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="preferences">Preferences</InputLabel>
                                <Select
                                    labelId="preferences"
                                    label="Preferences"
                                    value={preferences}
                                    multiple
                                    multiline
                                    onChange={(e) => {
                                        setPreferences(e.target.value);
                                    }}
                                    renderValue={(selected) => selected.map((p, pIdx) => {
                                        const title = PREFERENCES.find(pf => pf.id === p).title;
                                        return <Box key={pIdx}>•	{title}</Box>
                                    })}
                                >
                                    {PREFERENCES.map((pref, index) => (
                                        <MenuItem key={index} value={pref.id}>
                                            <Checkbox checked={preferences.indexOf(pref.id) > -1} />
                                            <Box display={'flex'} alignItems={'center'} columnGap={2}>
                                                <pref.Icon />
                                                {/* <Box borderRadius={'50%'} bgcolor={pref.color?.value} height={'19px'} width={'19px'}></Box> */}
                                                {pref.title}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} width={'100%'} display={'flex'}>
                            {isNew ?
                                <LoadingButton
                                    variant="contained"
                                    endIcon={<CloudUpload />}
                                    sx={{ mt: 'auto' }}
                                    fullWidth
                                    onClick={handleSubmit}
                                    loading={loading}
                                    size="large"
                                >
                                    Publish Ride
                                </LoadingButton>
                                :
                                <LoadingButton
                                    variant="contained"
                                    endIcon={<CloudSync />}
                                    sx={{ mt: 'auto' }}
                                    fullWidth
                                    onClick={handleUpdate}
                                    loading={updating}
                                    size="large"
                                >
                                    Update Ride
                                </LoadingButton>
                            }
                        </Box>

                    </Stack>
                </Box>
                {!isMobile ? <Box width={'100%'}>
                    <RidePublishMapView
                        from={locations[ID_RIDE_FROM]}
                        to={locations[ID_RIDE_TO]}
                        waypoints={waypoints}
                        onChange={setMapState}
                    // pickup={locations[ID_RIDE_PICKUP]}
                    // dropoff={locations[ID_RIDE_DROPOFF]}
                    />
                </Box>
                    : <>
                        <Zoom in={isMobile} sx={{ position: 'absolute', right: theme.spacing(2), bottom: theme.spacing(2) }}>
                            <StyledBadge color="error" variant="dot" isvisible={showNoti.toString()}>
                                <Fab onClick={handleShowMap} color="secondary">
                                    <Route fontSize="large" />
                                </Fab>
                            </StyledBadge>
                        </Zoom>

                        <Modal keepMounted hideBackdrop>
                            <Slide direction="up" in={isMapVisible} unmountOnExit={false}>
                                <Box component={Card} position={'absolute'} height={'100%'} width={'100%'} borderRadius={'0'} display={'flex'} flexDirection={'column'}>
                                    <CardHeader
                                        sx={{ py: 2, px: 3 }}
                                        title={<Typography variant="h4" color={'primary'}>Route</Typography>}
                                        action={<IconButton onClick={handleHideMap}>
                                            <Close />
                                        </IconButton>}
                                    />
                                    <CardContent sx={{ flexGrow: 1, px: 0, py: "0 !important" }}>
                                        <RidePublishMapView
                                            from={locations[ID_RIDE_FROM]}
                                            to={locations[ID_RIDE_TO]}
                                            waypoints={waypoints}
                                            onChange={setMapState}
                                        // pickup={locations[ID_RIDE_PICKUP]}
                                        // dropoff={locations[ID_RIDE_DROPOFF]}
                                        />
                                    </CardContent>
                                </Box>
                            </Slide>
                        </Modal>
                    </>
                }
            </Box>
        </MapsApiLoader>
    </Box>);
}

export default RideForm;