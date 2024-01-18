
import { AirlineSeatReclineExtra } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import searchSvg from "Assets/SVGs/Search.svg";
import { MHidden } from "Components/@Material-Extend";
import RouteList from "Components/Common/RouteList";
import SearchBar from "Components/Common/SearchBar";
import useRideApi from "Components/Hooks/useRideApi";
import { ROUTE_RIDES, ROUTE_SEARCH } from "Store/constants";
import { showError, showSuccess } from "Utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";


function SearchResultsForm() {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();
    const { loading, searchRide } = useRideApi();

    // ############################################# COMPUTED #############################################

    const fromCoords = {
        lng: parseFloat(searchParams.get("fLng")),
        lat: parseFloat(searchParams.get("fLat")),
    };
    const toCoords = {
        lng: parseFloat(searchParams.get("tLng")),
        lat: parseFloat(searchParams.get("tLat")),
    }
    const params = {
        from: searchParams.get("from"),
        fromPlaceId: searchParams.get("fromPlaceId"),
        to: searchParams.get("to"),
        toPlaceId: searchParams.get("toPlaceId"),
        seats: searchParams.get("seats"),
        fromCoords: JSON.stringify([fromCoords.lng, fromCoords.lat]),
        toCoords: JSON.stringify([toCoords.lng, toCoords.lat]),
    }
    if (searchParams.get("date")) {
        const dateArray = searchParams.get("date").split("-");
        dateArray[1] = dateArray[1] - 1;
        params["date"] = new Date(...dateArray.reverse());
    }

    // ############################################# States #############################################

    const [creatingRideAlert, setCreatingRideAlert] = useState(false);
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([
        // {
        //     id: "sdfjfdgh33w4r",
        //     startLegIndex: 0,  // process
        //     endLegIndex: 0,  // process
        //     startStepIndex: 1,  // process
        //     endStepIndex: 3,  // process
        //     startDistance: "5 km", // recalc
        //     endDistance: "7 km",  // recalc
        //     startTime: "8:00",  // recalc
        //     endTime: "11:30",  // recalc
        //     from: "Ahmedabad",
        //     to: "Surat",
        //     price: 650,
        //     seats: 3,
        //     publisher: {
        //         profileUrl: "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
        //         name: "Jacqueline",
        //     },
        // },
        // {
        //     id: "anotherId",
        //     startLegIndex: 1,
        //     endLegIndex: 2,
        //     startStepIndex: 2,
        //     endStepIndex: 4,
        //     startDistance: "8 km",
        //     endDistance: "12 km",
        //     startTime: "10:00",
        //     endTime: "13:45",
        //     from: "Surat",
        //     to: "Mumbai",
        //     price: 800,
        //     seats: 2,
        //     publisher: {
        //         profileUrl: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        //         name: "John Doe",
        //     },
        // },
        // {
        //     id: "thirdId",
        //     startLegIndex: 2,
        //     endLegIndex: 3,
        //     startStepIndex: 3,
        //     endStepIndex: 5,
        //     startDistance: "12 km",
        //     endDistance: "20 km",
        //     startTime: "12:30",
        //     endTime: "15:30",
        //     from: "Mumbai",
        //     to: "Pune",
        //     price: 500,
        //     seats: 4,
        //     publisher: {
        //         profileUrl: "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
        //         name: "Alice",
        //     },
        // },
    ]);

    // ############################################# Handlers #############################################

    const getRedirectUrl = (ride) => {
        const options = new URLSearchParams({
            fromPlaceId: params.fromPlaceId,
            toPlaceId: params.toPlaceId,
            fromCoords: params.fromCoords,
            toCoords: params.toCoords,
            departure: JSON.stringify({
                index: ride.departure.coordsIndex,
                text: [ride.departure.primaryText, ride.departure.secondaryText].join("--"),
            }),
            destination: JSON.stringify({
                index: ride.destination.coordsIndex,
                text: [ride.destination.primaryText, ride.destination.secondaryText].join("--"),
            }),
            requestedSeats: params.seats,
            pricePerSeat: ride.pricePerSeat,
        });
        return `${ROUTE_RIDES}/${ride._id}?${options.toString()}`;
    }

    const handleRideAlertCreation = () => {
        setCreatingRideAlert(true);
        setTimeout(() => {
            setCreatingRideAlert(false);
            console.log(params);
            showSuccess({ message: "You will be notified via email whenever a Ride is available" });
        }, 1000);
    }

    // ############################################# Effects #############################################

    useEffect(() => {
        // Redirects if invalid query
        if (searchParams.size === 0) {
            nav(ROUTE_SEARCH);
            return;
        } else if ([...searchParams].some(([k, v]) => v === "")) {
            nav(ROUTE_SEARCH);
            return;
        }

        // Retrieve Search Results from Backend
        searchRide(params).then(async (rides) => {
            if (rides.length === 0) {
                // handle no search result found
            } else {
                // const ridesWithPrice = rides.map(ride => {
                //     const coords = ride.locations.coordinates.slice(ride.departure.coordsIndex, ride.destination.coordsIndex + 1);
                //     const totalDistance = calculateTotalDistance(coords);
                //     // const pricePerKm = getPriceFromDistance(totalDistance);
                //     const pricePerKm = ride.totalDistance/ride.totalPrice
                //     ride.distance = totalDistance;
                //     ride.pricePerSeat = Math.ceil(totalDistance * pricePerKm / 10) * 10;
                //     return ride;
                // });
                setSearchResults(rides);
            }
        }).catch(err => {
            showError({ message: err.message });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>
        <Stack spacing={4}>
            <SearchBar
                from={{
                    fullName: params.from,
                    placeId: params.fromPlaceId,
                    geometry: { lng: fromCoords.lng, lat: fromCoords.lat }
                }}
                to={{
                    fullName: params.to,
                    placeId: params.toPlaceId,
                    geometry: { lng: toCoords.lng, lat: toCoords.lat }
                }}
                date={searchParams.get("date")}
                seats={params.seats}
            />

            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} gap={4}>
                {/* <MHidden width="mdDown">

                    <Stack width={'100%'} maxWidth={'400px'} spacing={2}>
                        <Box display={'flex'} alignItems={'center'} pl={3}>
                            <Typography color={'primary'} variant="h3">Filters</Typography>
                            <FilterAlt color="primary" fontSize="large" />
                        </Box>
                        <Stack spacing={1} sx={{ color: 'primary.main' }}>
                            <Box>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend" >Type of cars</FormLabel>
                                    <FormGroup>
                                        {
                                            VEHICLE_TYPE_OPTIONS.map((vehicleType, index) =>

                                                <FormControlLabel key={index}
                                                    control={
                                                        <Checkbox name={vehicleType} />
                                                    }
                                                    label={vehicleType}
                                                />
                                            )
                                        }
                                    </FormGroup>

                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">Type of fuels</FormLabel>
                                    <FormGroup>
                                        {
                                            VEHICLE_FUEL_TYPES.map((fuelType, index) =>

                                                <FormControlLabel key={index}
                                                    control={
                                                        <Checkbox name={fuelType} />
                                                    }
                                                    label={fuelType}
                                                />
                                            )
                                        }
                                    </FormGroup>

                                </FormControl>
                            </Box>

                            <Box>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">AC</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="Yes" />
                                            }
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="No" />
                                            }
                                            label="No"
                                        />
                                    </FormGroup>

                                </FormControl>
                            </Box>
                        </Stack>
                    </Stack>
                    <Divider orientation="vertical" flexItem />

                </MHidden>*/}
                <MHidden width="mdUp">
                    <Box display={'flex'} alignItems={'center'} px={1}>
                        {!loading && <Typography variant="h4" color={'text.secondary'}>{searchResults.length} rides available</Typography>}
                        {/* <Button
                            onClick={() => setIsFilterOpen(true)}
                            variant="contained"
                            sx={{ width: 'fit-content', ml: 'auto' }}
                            endIcon={<FilterAlt />}
                        >Apply Filters</Button> */}
                    </Box>
                </MHidden> 
                <Box width={'100%'} maxWidth={'700px'} mx={'auto'}>
                    {loading && !creatingRideAlert ? <>
                        <LinearProgress />
                    </>
                        :
                        searchResults.length === 0 ?
                            /* No Rides Found */
                            <>
                                <Box py={2}>
                                    <Stack spacing={2} alignItems={'center'}>
                                        <Box
                                            sx={{
                                                background: `url(${searchSvg}) no-repeat center`,
                                                backgroundSize: 'cover',
                                                height: { xs: 300, sm: 400, },
                                                width: '100%',
                                            }}
                                        />
                                        <Typography variant="h3" color={'primary'} textAlign={'center'}>No Rides found...</Typography>
                                        <Box />
                                        <LoadingButton
                                            variant="contained"
                                            color="secondary"
                                            sx={{ width: 'fit-content' }}
                                            onClick={handleRideAlertCreation}
                                            loading={creatingRideAlert}
                                        >
                                            Create Ride Alert
                                        </LoadingButton>
                                    </Stack>
                                </Box>
                            </>
                            :
                            /* Results found */
                            <Stack spacing={3}>
                                <MHidden width="mdDown">
                                    <Typography variant="h4" color={'text.secondary'}>{searchResults.length} rides available</Typography>
                                </MHidden>
                                {searchResults.map((result, index) => {
                                    return <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                                        <CardActionArea LinkComponent={Link} to={getRedirectUrl(result)}>
                                            <CardContent sx={{ p: 1 }}>
                                                <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                                    <Box>
                                                        <RouteList waypoints={[
                                                            {
                                                                primaryText: result.departure?.primaryText || result.from.primaryText,
                                                                secondaryText: result.departure?.secondaryText || result.from.secondaryText,
                                                                distance: result.departure?.distance,
                                                                date: format(new Date(result.departureDatetime), "MMM dd"),
                                                                time: format(new Date(result.departureDatetime), "hh:mm a"),
                                                                // ...result.from,
                                                                // primaryText: result.from,
                                                                // time: result.fromTime,
                                                                // fullName: "Block-J, Ahmedabad, Gujarat",
                                                            },
                                                            {
                                                                primaryText: result.destination?.primaryText || result.to.primaryText,
                                                                secondaryText: result.destination?.secondaryText || result.to.secondaryText,
                                                                distance: result.destination?.distance,
                                                                // ...result.to
                                                                // primaryText: result.to,
                                                                // time: result.toTime,
                                                                // secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                                                                // fullName: "Railway Station Cir, Surat, Gujarat",
                                                            },
                                                        ]} />
                                                    </Box>

                                                    <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                                        <Typography variant="h4">{`₹${result.pricePerSeat * params.seats}`}</Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                            <CardActions>
                                                <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                                                    <Avatar src={result.publisher.profilePicture} alt="Publisher Profile">
                                                    </Avatar>
                                                    <Typography variant="subtitle1">{result.publisher.name}</Typography>
                                                    <Tooltip title={`Max ${result.availableSeats} seats available`}>
                                                        <Box ml={'auto !important'} display={'flex'} gap={0.5} alignItems={'center'}>
                                                            <AirlineSeatReclineExtra />
                                                            <Typography variant="subtitle1">{result.availableSeats}</Typography>
                                                        </Box>
                                                    </Tooltip>
                                                </Stack>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                })}
                            </Stack>
                    }
                </Box>
            </Box>
        </Stack>
        {/* <Modal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} closeAfterTransition>
            <Slide direction="up" in={isFilterOpen}>
                <Card sx={{ height: '85vh', position: 'absolute', bottom: 0, right: 0, left: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                    <CardHeader
                        action={<IconButton onClick={() => setIsFilterOpen(false)}>
                            <Close />
                        </IconButton>}
                    />
                    <CardContent>
                        Hello World
                    </CardContent>
                </Card>
            </Slide>
        </Modal> */}
    </>);
}

export default SearchResultsForm;