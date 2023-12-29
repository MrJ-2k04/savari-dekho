
import { useTheme } from "@emotion/react";
import { Add, ArrowRightAlt, KeyboardArrowRight, Luggage, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import useApi from "Components/Hooks/useApi";
import useRideApi from "Components/Hooks/useRideApi";
import { PREFERENCES, ROUTE_RIDES, ROUTE_USER_DETAILS } from "Store/constants";
import { formatDateForRide, haversineDistance, showError, showSuccess } from "Utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";





function RideDetailsSection() {
    const [searchParams] = useSearchParams();
    const { rideId } = useParams();
    const nav = useNavigate();
    const { loading, getRideDetails } = useApi();
    const { loading: requesting, requestRide } = useRideApi();

    // ############################################# COMPUTED #############################################

    const params = {
        fromPlaceId: searchParams.get("fromPlaceId"),
        toPlaceId: searchParams.get("toPlaceId"),
        requestedSeats: parseInt(searchParams.get("requestedSeats")),
        fromCoords: null,
        toCoords: null,
        departure: null,
        destination: null,
    }
    try {
        params.departure = JSON.parse(searchParams.get("departure"));
        params.destination = JSON.parse(searchParams.get("destination"));
        params.departure.text = params.departure?.text?.split("--");
        params.destination.text = params.destination?.text?.split("--");
        params.fromCoords = JSON.parse(searchParams.get("fromCoords"));
        params.toCoords = JSON.parse(searchParams.get("toCoords"));
    } catch (error) { }
    console.log("Params: ", params);
    // if (searchParams.get("date")) {
    //     const dateArray = searchParams.get("date").split("-");
    //     dateArray[1] = dateArray[1] - 1;
    //     params["date"] = new Date(...dateArray.reverse());
    // }

    // ############################################# States #############################################

    const theme = useTheme();
    const [ride, setRide] = useState(null);
    const [error, setError] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [waypointIndex, setWaypointIndex] = useState({ startIndex: undefined, endIndex: undefined });
    // const waypoints = [
    //     {
    //         location: {
    //             primaryText: "Ahmedabad, Gujarat",
    //             secondaryText: "Block-J",
    //             fullName: "Block-J, Ahmedabad, Gujarat",
    //             time: "8:00"
    //         }
    //     },
    //     {
    //         location: {
    //             primaryText: "Surat, Gujarat",
    //             secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
    //             fullName: "Railway Station Cir, Surat, Gujarat",
    //             time: "11:40"
    //         }
    //     },
    //     {
    //         location: {
    //             primaryText: "Mahabaleshwar, Mumbai",
    //             secondaryText: "Green Gairy Bungalow, Lodwick Point Rd",
    //             fullName: "Green Gairy Bungalow, Mahabaleshwar, Mumbai",
    //             time: "" // You can fill in the time if needed
    //         }
    //     },
    //     {
    //         location: {
    //             primaryText: "Goa, India",
    //             secondaryText: "Goa Market",
    //             fullName: "Goa, India",
    //             time: "" // You can fill in the time if needed
    //         }
    //     },
    //     {
    //         location: {
    //             primaryText: "Kerala, India",
    //             secondaryText: "Kele ka jaad", // You can fill in additional details if needed
    //             fullName: "Kerala, India",
    //             time: "" // You can fill in the time if needed
    //         }
    //     },
    // ];

    // ############################################# Handlers #############################################

    const handleRequestRide = () => {
        requestRide(ride._id, {}).then((msg) => {
            showSuccess({ message: msg || "Ride Requested successfully, please wait until the driver confirms your ride." }).then(() => {
                nav(ROUTE_RIDES)
            })
        }).catch(err => {
            showError({ message: err.message });
        })
    }

    useEffect(() => {
        if (!rideId) {
            showError({ message: "Ride ID not found!" });
            return;
        }
        getRideDetails(rideId)
            .then(rideDetails => {
                try {
                    // Ride: A------X------Y-----B

                    // A to B
                    if (!params.departure && !params.destination) {
                        console.log("Ride: A======X======Y======B");

                        setRide(rideDetails);
                        setWaypoints([
                            rideDetails.from,
                            rideDetails.to,
                        ]);
                        setWaypointIndex({ startIndex: 0, endIndex: rideDetails.locations.coordinates.length - 1 });
                    }
                    // A to Y
                    else if (!params.departure) {
                        console.log("Ride: A======X======Y------B");
                        // Destination Computer Property
                        rideDetails.destination = {};
                        const destiCoords = rideDetails.locations.coordinates[params.destination?.index] || [];
                        rideDetails.destination.distance = haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]);
                        setRide(rideDetails);
                    }
                    // X to B
                    else if (!params.destination) {
                        console.log("Ride: A------X======Y======B");

                        // Departure Computed Property
                        const departCoords = rideDetails.locations.coordinates[params.departure?.index] || [];
                        rideDetails.departure = {
                            index: params.departure.index,
                            distance: haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]),
                        };
                    }
                    // X to Y
                    else {
                        console.log("Ride: A------X======Y------B");
                        // Departure Computed Property
                        const departCoords = rideDetails.locations.coordinates[params.departure?.index] || [];
                        rideDetails.departure = {
                            index: params.departure.index,
                            distance: haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]),
                            primaryText: params.departure.text[0],
                            secondaryText: params.departure.text[1],
                        };

                        // Destination Computer Property
                        const destiCoords = rideDetails.locations.coordinates[params.destination?.index] || [];
                        rideDetails.destination = {
                            index: params.destination.index,
                            distance: haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]),
                            primaryText: params.destination.text[0],
                            secondaryText: params.destination.text[1],
                        };

                        setRide(rideDetails);
                        const newWaypIndex = { startIndex: 1, endIndex: 2 };
                        const newWaypoints = [];
                        if (rideDetails.departure.index === 0 && rideDetails.destination.index === rideDetails.locations.coordinates.length - 1) {
                            newWaypoints.push(rideDetails.from, rideDetails.to);
                            newWaypIndex.startIndex = 0;
                            newWaypIndex.endIndex = 1;
                        }
                        else if (rideDetails.departure.index === 0) {
                            newWaypoints.push(rideDetails.from, rideDetails.destination, rideDetails.to);
                            newWaypIndex.startIndex = 0;
                        }
                        else if (rideDetails.destination.index === rideDetails.locations.coordinates.length - 1) {
                            newWaypoints.push(rideDetails.from, rideDetails.departure, rideDetails.to);
                        } else {
                            newWaypoints.push(rideDetails.from, rideDetails.departure, rideDetails.destination, rideDetails.to);
                        }
                        setWaypoints(newWaypoints);
                        setWaypointIndex(newWaypIndex);
                    }
                } catch (error) {
                    console.log(error.message, rideDetails);
                    setError(error.message);
                    setRide(rideDetails);
                }
            })
            .catch(err => {
                showError({ message: err.message })
                setError(err.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(ride);
    }, [ride]);

    return (<>
        {loading ? <Box mt={4}>
            <LinearProgress />
        </Box> :
            <>
                {(!error && ride) ?
                    <Box display={'flex'} width={'100%'} height={'100%'} flexDirection={'column'} gap={1}>
                        <Box>
                            <Typography color={'primary'} variant="h3" textAlign={'center'}>{formatDateForRide(ride.departureDatetime)}</Typography>
                        </Box>
                        <Box width={'100%'} sx={{ overflowX: 'hidden' }}>
                            <RouteList waypoints={waypoints} price={540} startIndex={waypointIndex.startIndex} endIndex={waypointIndex.endIndex} />
                        </Box>
                        <Divider variant="fullWidth" flexItem sx={{ borderWidth: 4, borderRadius: '16px' }} />
                        <Box aria-label="price section" width={'100%'} p={2}>
                            <Grid container rowSpacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <Box display={'flex'} alignItems={'center'} sx={{ justifyContent: { xs: 'center', sm: "start" } }} gap={2} height={'100%'}>
                                        <Typography>Seats</Typography>
                                        <IconButton size="small">
                                            <Remove />
                                        </IconButton>
                                        2
                                        <IconButton size="small">
                                            <Add />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ justifyContent: "end" }}>
                                        <Typography color={'primary'} variant="h3">₹{ride.totalPrice}</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider variant="fullWidth" flexItem sx={{ borderWidth: 4, borderRadius: '16px' }} />
                        <Box aria-label="publisher section">
                            <ListItemButton
                                LinkComponent={Link}
                                to={ROUTE_USER_DETAILS.replace(":userId", ride.publisher._id)}
                                sx={{ borderRadius: '16px', my: 1 }}>
                                <ListItemIcon>
                                    <Avatar>
                                        <Box component={'img'} sx={{ WebkitTextStrokeWidth: '1px' }} src={ride.publisher.profilePicture} alt="Driver avatar" />
                                    </Avatar>
                                    {/* <History  /> */}
                                </ListItemIcon>
                                <ListItemText
                                // secondary={`${item.seats} ${item.seats > 1 ? "Passengers" : "Passenger"}`}
                                >
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Typography sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                            maxWidth: 'max-content'
                                        }}>
                                            {`${ride.publisher.firstName} ${ride.publisher.lastName}`}
                                        </Typography>
                                    </Box>
                                </ListItemText>
                                <ListItemIcon sx={{ justifyContent: 'right' }}>
                                    <KeyboardArrowRight />
                                </ListItemIcon>
                            </ListItemButton>
                        </Box>
                        <Divider variant="fullWidth" flexItem />

                        {ride.preferences && ride.preferences.length > 0 && <>
                            <Box aria-label="preferences section" py={1}>
                                <Typography gutterBottom variant="h4" color={'primary'}>Preferences</Typography>
                                {PREFERENCES.filter(pref => (ride.preferences || []).includes(pref.id)).map((pref, index) => {
                                    return <ListItem key={index}>
                                        <ListItemIcon sx={{ color: "text.secondary" }}><pref.Icon /></ListItemIcon>
                                        <ListItemText color={'text.secondary'}>
                                            {pref.title}
                                        </ListItemText>
                                    </ListItem>
                                })}
                            </Box>
                            <Divider variant="fullWidth" flexItem />
                        </>}
                        <Box />
                        {ride.passengers.length > 0 && <Box aria-label="co-travellers section">
                            <Typography gutterBottom variant="h4" color={'primary'}>Co-travellers</Typography>
                            <List>
                                {ride.passengers.map(passenger =>
                                    <ListItemButton
                                        key={passenger.passengerId}
                                        LinkComponent={Link}
                                        to={ROUTE_USER_DETAILS.replace(":userId", ride.publisher._id)}
                                        sx={{ borderRadius: '16px', my: 1 }}>
                                        <ListItemIcon>
                                            <Avatar>
                                                <Box component={'img'} sx={{ WebkitTextStrokeWidth: '1px' }} src={passenger.profilePicture} alt="Driver avatar" />
                                            </Avatar>
                                            {/* <History  /> */}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Box display={'flex'} alignItems={'center'} gap={1}>
                                                <Typography sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%',
                                                    maxWidth: 'max-content'
                                                }}>
                                                    {`${passenger.firstName} ${passenger.lastName}`}
                                                </Typography>
                                            </Box>
                                            <Box display={'flex'} alignItems={'center'} gap={1} color={'text.secondary'}>
                                                <Typography sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%',
                                                    maxWidth: 'max-content',
                                                }}>
                                                    {passenger.departure.secondaryText}
                                                </Typography>
                                                <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                                <Typography sx={{
                                                    width: '100%',
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                    {passenger.destination.secondaryText}
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <ListItemIcon sx={{ justifyContent: 'right' }}>
                                            <KeyboardArrowRight />
                                        </ListItemIcon>
                                    </ListItemButton>
                                )}
                            </List>
                        </Box>}
                        <Divider variant="fullWidth" flexItem />
                        <Box mx={'auto'} py={2}>
                            <LoadingButton loading={requesting} onClick={handleRequestRide} size="large" sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }} color="secondary" variant="contained" endIcon={<Luggage />}>Book Ride</LoadingButton>
                        </Box>
                    </Box>
                    :
                    <Container>
                        <Stack spacing={2}>
                            <Typography variant="h3">Some error occured</Typography>
                            <Typography variant="subtitle1">{error}</Typography>
                        </Stack>
                    </Container>
                }
            </>
        }
    </>);
}

export default RideDetailsSection;