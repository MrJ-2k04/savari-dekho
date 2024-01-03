
import { Add, ArrowCircleDown, ArrowRightAlt, Cancel, Done, Edit, KeyboardArrowRight, Luggage, QuestionMark, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { MHidden } from "Components/@Material-Extend";
import RouteList from "Components/Common/RouteList";
import useRideApi from "Components/Hooks/useRideApi";
import { PASSENGER_STATUS, PASSENGER_STATUS_DESCRIPTION, PASSENGER_STATUS_ICONS, PREFERENCES, ROUTE_LOGIN, ROUTE_RIDES, ROUTE_RIDE_EDIT, ROUTE_USER_DETAILS } from "Store/constants";
import { selectUser } from "Store/selectors";
import { calculateTotalDistance, capitalizeWords, formatDateForRide, getPriceFromDistance, haversineDistance, showError, showInfo, showSuccess } from "Utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";





function RideDetailsSection({ ride: parentRideState, onChange: setParentRideState }) {
    const [searchParams] = useSearchParams();
    const { rideId } = useParams();
    const nav = useNavigate();
    const { loading: rideLoading, requestRide, getRideDetails, updatePassengerStatus } = useRideApi();
    const user = useSelector(selectUser);

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

    // ############################################# States #############################################

    const [ride, setRide] = useState(null);
    const isOwner = ride?.publisherId === user?._id;
    const [error, setError] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [waypointIndex, setWaypointIndex] = useState({ startIndex: undefined, endIndex: undefined });
    const [requestedSeats, setRequestedSeats] = useState(params.requestedSeats || 1);
    const [fetching, setFetching] = useState(true);

    // ############################################# COMPUTED #############################################

    const coTravellers = ride?.passengers.filter(p => [PASSENGER_STATUS.COMPLETED, PASSENGER_STATUS.STARTED, PASSENGER_STATUS.CONFIRMED].includes(p.status)) || [];

    // ############################################# RIDE HANDLERS #############################################

    const handleSeatsAdd = () => {
        if (requestedSeats === ride.totalEmptySeats) {
            return showInfo({ title: "Note", message: `A maximum of only ${ride.totalEmptySeats} seats can be requested` });
        }
        setRequestedSeats(requestedSeats + 1);
    }
    const handleSeatsRemove = () => {
        if (requestedSeats === 1) return;
        setRequestedSeats(requestedSeats - 1);
    }

    // ############################################# RIDE API CONNECTIVITY HANDLERS #############################################

    const handleRequestRide = () => {
        if (!user) {
            nav(ROUTE_LOGIN, { state: { redirectUrl: `${window.location.pathname}${window.location.search}` } });
        }

        const payload = {
            occupiedSeats: requestedSeats,
            departure: JSON.stringify({
                primaryText: ride.departure.primaryText,
                secondaryText: ride.departure.secondaryText,
                index: ride.departure.index,
            }),
            destination: JSON.stringify({
                primaryText: ride.destination.primaryText,
                secondaryText: ride.destination.secondaryText,
                index: ride.destination.index,
            })
        }
        if (params.fromCoords && params.fromPlaceId) {
            payload.from = JSON.stringify({ placeId: params.fromPlaceId, coords: params.fromCoords });
        }
        if (params.toCoords && params.toPlaceId) {
            payload.to = JSON.stringify({ placeId: params.toPlaceId, coords: params.toCoords });
        }


        requestRide(ride._id, payload).then((msg) => {
            showSuccess({ message: msg || "Ride Requested successfully, please wait until the driver confirms your ride." }).then(() => {
                nav(ROUTE_RIDES)
            })
        }).catch(err => {
            showError({ message: err.message });
        })
    }
    const handleRideApprove = (passengerId) => {
        const payload = {
            passengerId,
            isApproved: true,
        }
        updatePassengerStatus(ride._id, payload).then((msg) => {
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId === passengerId);
                console.log(passenger);
                if (!passenger) return;
                passenger.status = PASSENGER_STATUS.BOOKED;
                return oldRide;
            })
            showSuccess({ message: "Passenger approved successfully. Please wait for the passenger to make the payment." });
        }).catch(err => showError({ message: err.message }));
    }
    const handleRideReject = (passengerId) => {
        const payload = {
            passengerId,
            isApproved: false,
        }
        updatePassengerStatus(ride._id, payload).then((msg) => {
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId === passengerId);
                if (!passenger) return;
                passenger.status = PASSENGER_STATUS.REJECTED;
                return oldRide;
            })
            showSuccess({ message: "Passenger rejected successfully." });
        }).catch(err => showError({ message: err.message }));
    }

    // ############################################# USE-EFFECTS #############################################

    const syncRide = () => {
        setFetching(true);
        getRideDetails(rideId)
            .then(rideDetails => {
                try {
                    // Ride: A------X------Y-----B
                    let newWaypoints = [];
                    let newWaypointIndex = {};
                    let finalRide = rideDetails;

                    // A to B
                    if (!params.departure && !params.destination) {
                        // console.log("Ride: A======X======Y======B");

                        // setRide(rideDetails);
                        newWaypoints = [
                            finalRide.from,
                            finalRide.to,
                        ];
                        newWaypointIndex = { startIndex: 0, endIndex: finalRide.locations.coordinates.length - 1 };
                    }
                    // A to Y
                    else if (!params.departure) {
                        // console.log("Ride: A======X======Y------B");
                        // Destination Computer Property
                        finalRide.destination = {};
                        const destiCoords = finalRide.locations.coordinates[params.destination?.index] || [];
                        finalRide.destination.distance = haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]);
                        // setRide(rideDetails);
                    }
                    // X to B
                    else if (!params.destination) {
                        // console.log("Ride: A------X======Y======B");

                        // Departure Computed Property
                        const departCoords = finalRide.locations.coordinates[params.departure?.index] || [];
                        finalRide.departure = {
                            index: params.departure.index,
                            distance: haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]),
                        };
                    }
                    // X to Y
                    else {
                        // console.log("Ride: A------X======Y------B");
                        // Departure Computed Property
                        const departCoords = finalRide.locations.coordinates[params.departure?.index] || [];
                        finalRide.departure = {
                            index: params.departure.index,
                            distance: haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]),
                            primaryText: params.departure.text[0],
                            secondaryText: params.departure.text[1],
                        };

                        // Destination Computer Property
                        const destiCoords = finalRide.locations.coordinates[params.destination?.index] || [];
                        finalRide.destination = {
                            index: params.destination.index,
                            distance: haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]),
                            primaryText: params.destination.text[0],
                            secondaryText: params.destination.text[1],
                        };

                        // setRide(rideDetails);
                        newWaypointIndex = { startIndex: 1, endIndex: 2 };
                        if (finalRide.departure.index === 0 && finalRide.destination.index === finalRide.locations.coordinates.length - 1) {
                            newWaypoints.push(finalRide.from, finalRide.to);
                            newWaypointIndex.startIndex = 0;
                            newWaypointIndex.endIndex = 1;
                        }
                        else if (finalRide.departure.index === 0) {
                            newWaypoints.push(finalRide.from, finalRide.destination, finalRide.to);
                            newWaypointIndex.startIndex = 0;
                        }
                        else if (finalRide.destination.index === finalRide.locations.coordinates.length - 1) {
                            newWaypoints.push(finalRide.from, finalRide.departure, finalRide.to);
                        } else {
                            newWaypoints.push(finalRide.from, finalRide.departure, finalRide.destination, finalRide.to);
                        }
                        // setWaypoints(newWaypoints);
                        // setWaypointIndex(newWaypointIndex);
                    }

                    // Price Estimation
                    const startIndex = finalRide.departure?.index || 0;
                    const endIndex = finalRide.destination?.index || finalRide.locations.coordinates.length - 1;
                    const coordinates = finalRide.locations.coordinates.slice(startIndex, endIndex + 1);
                    finalRide.distance = Math.ceil(calculateTotalDistance(coordinates));
                    const pricePerKm = getPriceFromDistance(finalRide.distance);
                    finalRide.pricePerSeat = Math.ceil(finalRide.distance * pricePerKm / 10) * 10;

                    setRide(finalRide);
                    setWaypoints(newWaypoints);
                    setWaypointIndex(newWaypointIndex);
                } catch (error) {
                    console.log(error.message, rideDetails);
                    setError(error.message);
                    setRide(rideDetails);
                }
            })
            .catch(err => {
                showError({ message: err.message })
                setError(err.message);
            })
            .finally(() => setFetching(false));
    }

    useEffect(() => {
        if (!rideId) {
            showError({ message: "Ride ID not found!" });
            return;
        }

        syncRide();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!ride) return;
        setParentRideState(ride);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ride]);

    return (<>
        {fetching ? <Box mt={4}>
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
                                        <IconButton size="small" onClick={handleSeatsRemove}>
                                            <Remove />
                                        </IconButton>
                                        {requestedSeats}
                                        <IconButton size="small" onClick={handleSeatsAdd}>
                                            <Add />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ justifyContent: "end" }}>
                                        <Typography color={'primary'} variant="h3">₹{ride.pricePerSeat * requestedSeats}</Typography>
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

                        {ride.preferences && ride.preferences.length > 0 && <>
                            <Divider variant="fullWidth" flexItem />
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
                        </>}
                        <Box />
                        {!isOwner
                            ? coTravellers.length > 0 &&
                            <>
                                <Divider variant="fullWidth" flexItem />
                                <Box aria-label="co-travellers section">
                                    <Typography gutterBottom variant="h4" color={'primary'}>Co-travellers</Typography>
                                    <List>
                                        {coTravellers.map(passenger =>
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
                                                            {passenger.departure?.secondaryText}
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
                                                            {passenger.destination?.secondaryText}
                                                        </Typography>
                                                    </Box>
                                                </ListItemText>
                                                <ListItemIcon sx={{ justifyContent: 'right' }}>
                                                    <KeyboardArrowRight />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        )}
                                    </List>
                                </Box>
                            </>
                            :
                            ride.passengers.length > 0 &&
                            <>
                                <Divider variant="fullWidth" flexItem />
                                <Box aria-label="co-travellers section">
                                    <Typography gutterBottom variant="h4" color={'primary'}>Passengers</Typography>
                                    <List>
                                        {ride.passengers.map(passenger => {
                                            const StatusIcon = PASSENGER_STATUS_ICONS[passenger.status] || <QuestionMark color="secondary" />;
                                            return <ListItem
                                                key={passenger.passengerId}
                                                LinkComponent={Link}
                                                to={ROUTE_USER_DETAILS.replace(":userId", ride.publisher._id)}
                                                sx={{ borderRadius: '16px', my: 1, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                                <ListItemIcon>
                                                    <IconButton LinkComponent={Link} to={`${ROUTE_USER_DETAILS.replace(":userId", passenger.passengerId)}`} target="_blank">
                                                        <Avatar sx={{ height: '72px', width: '72px' }}>
                                                            <Box component={'img'} sx={{ WebkitTextStrokeWidth: '1px' }} src={passenger.profilePicture} alt="Driver avatar" />
                                                        </Avatar>
                                                    </IconButton>
                                                    {/* <History  /> */}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                                                        <Stack spacing={2}>
                                                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                                                                <Typography variant="h4" sx={{
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
                                                                <Typography variant="h3" color={'success.main'} sx={{
                                                                    display: '-webkit-box',
                                                                    overflow: 'hidden',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '100%',
                                                                    maxWidth: 'max-content'
                                                                }}>
                                                                    ₹{passenger.amount}
                                                                </Typography>
                                                            </Box>
                                                            <Box display={'flex'} flexDirection={{ xs: "column", md: 'row' }} alignItems={'center'} gap={1} color={'text.secondary'}>
                                                                <Typography gutterBottom sx={{
                                                                    display: '-webkit-box',
                                                                    overflow: 'hidden',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '100%',
                                                                    maxWidth: 'max-content',
                                                                }}>
                                                                    {passenger.departure?.secondaryText}
                                                                </Typography>
                                                                <MHidden width="mdDown">
                                                                    <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                                                </MHidden>
                                                                <MHidden width="mdUp">
                                                                    <ArrowCircleDown sx={{ color: 'text.disabled' }} />
                                                                </MHidden>
                                                                <Typography gutterBottom sx={{
                                                                    width: '100%',
                                                                    display: '-webkit-box',
                                                                    overflow: 'hidden',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    textOverflow: 'ellipsis',
                                                                }}>
                                                                    {passenger.destination?.secondaryText}
                                                                </Typography>
                                                            </Box>
                                                            <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
                                                                {passenger.status === PASSENGER_STATUS.REQUESTED ?
                                                                    <>
                                                                        <Button onClick={() => handleRideApprove(passenger.passengerId)} variant="contained" color="success" startIcon={<Done />}>Approve</Button>
                                                                        <Button onClick={() => handleRideReject(passenger.passengerId)} variant="outlined" color="error" startIcon={<Cancel />}>Reject</Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={{ xs: 'center', md: 'start' }}>
                                                                            {StatusIcon}
                                                                            <Typography fontWeight={500}>{capitalizeWords(passenger.status)}</Typography>
                                                                        </Box>
                                                                        <Typography textAlign={'center'} color={'text.secondary'}>{PASSENGER_STATUS_DESCRIPTION[passenger.status]}</Typography>
                                                                    </>}
                                                            </Stack>
                                                        </Stack>
                                                    </Box>
                                                </ListItemText>
                                            </ListItem>
                                        }
                                        )}
                                    </List>
                                </Box>
                            </>
                        }
                        <Divider variant="fullWidth" flexItem />
                        <Box mx={'auto'} py={2}>
                            {isOwner ?
                                <Button LinkComponent={Link} to={ROUTE_RIDE_EDIT.replace(":rideId", ride._id)} size="large" sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }} color="secondary" variant="contained" endIcon={<Edit />}>Edit Ride</Button>
                                :
                                <LoadingButton loading={rideLoading} onClick={handleRequestRide} size="large" sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }} color="secondary" variant="contained" endIcon={<Luggage />}>Book Ride</LoadingButton>
                            }
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