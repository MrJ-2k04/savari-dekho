import { Add, AirlineSeatReclineExtra, CloudUpload, Delete, Palette } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, ListItemIcon, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useApi from "Components/Hooks/useApi";
import MyGoogleMap from "Components/Other/MyGoogleMap";
import { ROUTE_RIDES, ROUTE_RIDE_PUBLISH, ROUTE_VEHICLE_ADD } from "Store/constants";
import { isEmptyString, isFalsy, isNumeric, showError, showSuccess } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const steps = ['Ride Details', 'Confirm Route'];
const minDelayHrs = 2;
const minDateTime = new Date(new Date().getTime() + (minDelayHrs * 60 * 60 * 1000));

const ID_RIDE_TO = "to";
const ID_RIDE_FROM = "from";
const ID_RIDE_PICKUP = "pickup";
const ID_RIDE_DROPOFF = "dropoff";
const ID_WAYP_LOCATION = "location";
const ID_WAYP_PRICE = "price";


function RideForm({ isNew = false }) {

    // #################################################### STATES ####################################################

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeStep, setActiveStep] = useState(0);
    const { loading, publishRide, getVehicles } = useApi();
    const nav = useNavigate();

    // Ride States
    const [locations, setLocations] = useState({});
    const [departureDatetime, setDepartureDatetime] = useState(null);
    const [journeyPrice, setJourneyPrice] = useState('');
    const [waypoints, setWaypoints] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleOptions, setVehicleOptions] = useState([]);
    const [emptySeats, setEmptySeats] = useState('');

    // Error States
    const [locationErrors, setLocationErrors] = useState({});
    const [datetimeError, setDatetimeError] = useState('');
    const [journeyPriceError, setJourneyPriceError] = useState('');
    const [waypointErrors, setWaypointErrors] = useState({});
    const [vehicleError, setVehicleError] = useState('');
    const [emptySeatsError, setEmptySeatsError] = useState('');


    // #################################################### STEP HANDLERS ####################################################

    const handleNext = () => {
        setActiveStep(1);
    }
    const handleBack = () => {
        setActiveStep(0)
    }

    // #################################################### MAP HANDLERS ####################################################

    const syncRide = () => {

    }

    const handleLocationChange = (newLocation, field) => {
        if (!isEmptyString(newLocation)) {
            setLocationErrors({ ...locationErrors, [field]: '' })
        }
        setLocations({ ...locations, [field]: newLocation });
    }
    const handleWaypointDetailsChange = (newValue, field, index) => {
        if (!isEmptyString(newValue)) {
            setWaypointErrors({
                ...waypointErrors,
                [index]: {
                    ...waypointErrors[index],
                    [field]: ''
                }
            })
        }
        const newWaypoints = [...waypoints];
        newWaypoints[index][field] = newValue;
        setWaypoints(newWaypoints);
    }
    const handleAddWaypoint = () => {
        setWaypoints([...waypoints, {}])
        setWaypointErrors({ ...waypointErrors, [waypoints.length]: {} });
    }
    const handleDeleteWaypoint = (index) => {
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
        console.log(waypointErrors, newWaypointErrors);
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
            if (isFalsy(locations[ID_RIDE_PICKUP])) {
                newLocationErrors[ID_RIDE_PICKUP] = 'Please enter a valid pickup location';
                isValid = false;
            }
            if (isFalsy(locations[ID_RIDE_TO])) {
                newLocationErrors[ID_RIDE_TO] = 'Please enter a valid destination location';
                isValid = false;
            }
            if (isFalsy(locations[ID_RIDE_DROPOFF])) {
                newLocationErrors[ID_RIDE_DROPOFF] = 'Please enter a valid dropoff location';
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
                if (isFalsy(waypoint[ID_WAYP_PRICE])) {
                    newWaypointErrors[index][ID_WAYP_PRICE] = 'Please enter a valid price';
                    isValid = false;
                }
            })
            setWaypointErrors(newWaypointErrors);


            // Other Validations
            if (isFalsy(journeyPrice)) {
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
            if (isEmptyString(emptySeats)) {
                setEmptySeatsError('You must carry atleast 1 passenger');
                isValid = false;
            }
        }


        if (!isValid) return;

        const payload = {
            ...locations,
            departureDatetime,
            price: journeyPrice,
            vehicleId,
            emptySeats,
        }
        if(waypoints.length>0){
            payload['waypoints'] = JSON.stringify(waypoints);
        }
        // Submit the Form
        publishRide(payload).then(ack => {
            showSuccess({ message: ack.message }).then(() => nav(`${ROUTE_RIDES}/${ack.payload}`))
        }).catch(err => {
            showError({ message: err.message })
        })
    }

    // #################################################### USEEFFECTS ####################################################

    useEffect(() => {
        if (isNew) return;

        syncRide();
    }, [isNew])

    useEffect(() => {
        getVehicles().then(vehicles => {
            setVehicleOptions(vehicles);
        }).catch(err => {
            console.error(err.message);
            setVehicleError('Error loading vehicle options');
        });
    }, [])



    return (<Box position={'absolute'} height={'100%'} width={'100%'}>

        {isMobile ? <>
            Mobile component
        </> : <>
            <Box display={'flex'} width={'100%'} height={'100%'}>
                <Box width={'100%'} maxWidth={'600px'} sx={{ overflowX: 'hidden' }}>
                    <Stack width={'100%'} p={4} pb={6} spacing={4} mx={'auto'} minHeight={'100%'}>
                        <Typography variant="h2" textAlign={'center'} color={'primary'}>
                            Publish
                            <Box component={"span"} color={"secondary.main"}> a </Box>
                            Ride
                        </Typography>
                        <Box width={'100%'} display={'flex'} gap={3}>
                            <TextField
                                label='From'
                                placeholder="From State/City"
                                fullWidth
                                value={locations[ID_RIDE_FROM] || ''}
                                onChange={e => handleLocationChange(e.target.value, ID_RIDE_FROM)}
                                error={!isFalsy(locationErrors[ID_RIDE_FROM])}
                                helperText={locationErrors[ID_RIDE_FROM]}
                            />
                            <TextField
                                label='Pickup Location'
                                placeholder="Exact Starting Location"
                                fullWidth
                                value={locations[ID_RIDE_PICKUP] || ''}
                                onChange={e => handleLocationChange(e.target.value, ID_RIDE_PICKUP)}
                                error={!isFalsy(locationErrors[ID_RIDE_PICKUP])}
                                helperText={locationErrors[ID_RIDE_PICKUP]}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddWaypoint}
                        >
                            Add Stopovers
                        </Button>
                        {waypoints.map((waypoint, index) =>
                            <Box width={'100%'} display={'flex'} gap={3} alignItems={'center'}>
                                <TextField
                                    label={`Stopover ${index + 1}`}
                                    placeholder="In-between Stop"
                                    fullWidth
                                    value={waypoint[ID_WAYP_LOCATION] || ''}
                                    onChange={e => handleWaypointDetailsChange(e.target.value, ID_WAYP_LOCATION, index)}
                                    error={!isFalsy(waypointErrors[index]?.[ID_WAYP_LOCATION])}
                                    helperText={waypointErrors[index]?.[ID_WAYP_LOCATION]}
                                />
                                <TextField
                                    fullWidth
                                    label='Price'
                                    type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        min: 0,
                                        step: 1
                                    }}
                                    value={waypoint[ID_WAYP_PRICE] || ''}
                                    onChange={e => handleWaypointDetailsChange(parseInt(e.target.value) || "", ID_WAYP_PRICE, index)}
                                    error={!isFalsy(waypointErrors[index]?.[ID_WAYP_PRICE])}
                                    helperText={waypointErrors[index]?.[ID_WAYP_PRICE]}
                                />
                                <IconButton onClick={e => handleDeleteWaypoint(index)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        )}
                        <Box width={'100%'} display={'flex'} gap={3}>
                            <TextField
                                label='To'
                                placeholder="Destination State/City"
                                fullWidth
                                value={locations[ID_RIDE_TO] || ''}
                                onChange={e => handleLocationChange(e.target.value, ID_RIDE_TO)}
                                error={!isFalsy(locationErrors[ID_RIDE_TO])}
                                helperText={locationErrors[ID_RIDE_TO]}
                            />
                            <TextField
                                label='Dropoff location'
                                placeholder="Exact Ending Location"
                                fullWidth
                                value={locations[ID_RIDE_DROPOFF] || ''}
                                onChange={e => handleLocationChange(e.target.value, ID_RIDE_DROPOFF)}
                                error={!isFalsy(locationErrors[ID_RIDE_DROPOFF])}
                                helperText={locationErrors[ID_RIDE_DROPOFF]}
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
                                        setDatetimeError(`Minimum datetime must be ${minDelayHrs} hours from now`)
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
                            helperText={journeyPriceError}
                            error={!isEmptyString(journeyPriceError)}
                            value={journeyPrice}
                            onChange={e => {
                                if (isEmptyString(e.target.value)) {
                                    setJourneyPrice('');
                                    return;
                                }
                                const price = parseInt(e.target.value);
                                if (isNumeric(price)) {
                                    setJourneyPrice(price);
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
                            value={emptySeats}
                            onChange={e => {
                                if (isEmptyString(e.target.value)) {
                                    setEmptySeats('');
                                    return;
                                }
                                const seats = parseInt(e.target.value);
                                if (isNumeric(seats) && seats > 0) {
                                    setEmptySeats(seats);
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

                        <Box flexGrow={1} width={'100%'} display={'flex'}>
                            <LoadingButton
                                variant="contained"
                                endIcon={<CloudUpload />}
                                sx={{ mt: 'auto' }}
                                fullWidth
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                Publish Ride
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Box>
                <Box width={'100%'}>
                    <MyGoogleMap />
                </Box>
            </Box>
        </>
        }
        {/* <Container maxWidth='md'>
            <Stack spacing={4} py={3}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === 0 && <>
                    
                </>}
                {activeStep === 1 && <>
                    <MyGoogleMap />
                </>}
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Button onClick={handleBack}>
                        Go back
                    </Button>
                    <LoadingButton
                        variant="contained"
                        loading={loading}
                        startIcon={activeStep === 0 ? <NavigateNext /> : <CloudUpload />}
                        onClick={handleNext}
                    >
                        {activeStep === 0 ? "Next" : "Publish"}
                    </LoadingButton>
                </Box>
            </Stack>
        </Container> */}
    </Box>);
}

export default RideForm;