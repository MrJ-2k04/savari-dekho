
import { Add, AirlineSeatReclineExtra, ArrowCircleDown, ArrowRightAlt, Cancel, CurrencyRupee, Done, Edit, KeyboardArrowRight, LocalTaxi, Luggage, NoCrash, PlayCircleOutline, QuestionMark, Remove, WhereToVote } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography, styled } from "@mui/material";
import { MHidden } from "Components/@Material-Extend";
import RouteList from "Components/Common/RouteList";
import useRideApi from "Components/Hooks/useRideApi";
import { PASSENGER_STATUS, PASSENGER_STATUS_ICONS, PREFERENCES, RIDE_STATUS, ROUTE_LOGIN, ROUTE_RIDES, ROUTE_RIDE_EDIT, ROUTE_USER_DETAILS, STATUS_DESCRIPTION_FOR_DRIVER, STATUS_DESCRIPTION_FOR_PASSENGER } from "Store/constants";
import { selectUser } from "Store/selectors";
import { calculateTotalDistance, capitalizeWords, formatDateForRide, getPriceFromDistance, haversineDistance, showConfirmationDialog, showError, showInfo, showSuccess } from "Utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";



const SmartTypography = styled(Typography)(({
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    width: '100%',
    maxWidth: 'max-content',
}));

function RideDetailsSection({ ride: parentRideState, onChange: setParentRideState }) {
    const [searchParams] = useSearchParams();
    const { rideId } = useParams();
    const nav = useNavigate();
    const { loading: rideLoading,
        getRideDetails,
        // Passenger Level
        requestRide,
        confirmRide,
        cancelRideBooking,
        // Driver Level
        updatePassengerStatus,
        startPassengerRide,
        endPassengerRide,
        sendOtpToPassenger,
        startWholeRide,
        endWholeRide,
        cancelWholeRide,
    } = useRideApi();
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
        if (searchParams.has("fromCoords")) {
            params.fromCoords = JSON.parse(searchParams.get("fromCoords"));
        }
        if (searchParams.has("toCoords")) {
            params.toCoords = JSON.parse(searchParams.get("toCoords"));
        }
    } catch (error) { }

    // ############################################# States #############################################

    const [ride, setRide] = useState(null);
    const isOwner = ride?.publisher._id === user?._id;
    const [error, setError] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [waypointIndex, setWaypointIndex] = useState({ startIndex: undefined, endIndex: undefined });
    const [requestedSeats, setRequestedSeats] = useState(params.requestedSeats || 1);
    const [fetching, setFetching] = useState(true);

    // ############################################# COMPUTED #############################################

    // const coTravellers = ride?.passengers.filter(p => [PASSENGER_STATUS.COMPLETED, PASSENGER_STATUS.STARTED, PASSENGER_STATUS.CONFIRMED].includes(p.status)) || [];
    const coTravellers = ride?.passengers.filter(p => p.passengerId !== user?._id);
    const currentPassenger = ride?.passengers.find(p => p.passengerId === user?._id);
    const canEditRide = isOwner && ride.passengers.every(p => [PASSENGER_STATUS.REQUESTED, PASSENGER_STATUS.REJECTED, PASSENGER_STATUS.CANCELLED].includes(p.status)) && ride.status === RIDE_STATUS.PUBLISHED;

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

    // Passenger Side
    const handleRequestRide = () => {
        if (!user) {
            nav(ROUTE_LOGIN, { state: { redirectUrl: `${window.location.pathname}${window.location.search}` } });
        }
        console.log(ride);
        const payload = {
            occupiedSeats: requestedSeats,
            amount: Math.round(requestedSeats * ride.pricePerSeat),
        }

        if (!params.departure) {
            payload.departure = JSON.stringify({
                primaryText: ride.from.primaryText,
                secondaryText: ride.from.secondaryText,
                index: 0,
            });
        } else {
            payload.departure = JSON.stringify({
                primaryText: ride.departure.primaryText,
                secondaryText: ride.departure.secondaryText,
                index: ride.departure.index,
            });
            if (params.fromCoords && params.fromPlaceId) {
                payload.from = JSON.stringify({ placeId: params.fromPlaceId, coords: params.fromCoords });
            }
        }

        if (!params.destination) {
            payload.destination = JSON.stringify({
                primaryText: ride.to.primaryText,
                secondaryText: ride.to.secondaryText,
                index: ride.locations.coordinates.length - 1,
            });
        } else {
            payload.destination = JSON.stringify({
                primaryText: ride.destination.primaryText,
                secondaryText: ride.destination.secondaryText,
                index: ride.destination.index,
            });
            if (params.toCoords && params.toPlaceId) {
                payload.to = JSON.stringify({ placeId: params.toPlaceId, coords: params.toCoords });
            }
        }

        requestRide(ride._id, payload).then((msg) => {
            showSuccess({ message: msg || "Ride Requested successfully, please wait until the driver confirms your ride." }).then(() => {
                nav(ROUTE_RIDES)
            })
        }).catch(err => {
            showError({ message: err.message });
        })
    }
    const handleRideConfirm = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            title: "Confirm Ride?",
            message: `Agreeing will deduct ₹X from your wallet to confirm the ride booking`,
            confirmBtnText: "Make Payment",
            cancelBtnText: "Go Back",
        });
        if (!isConfirmed) return;

        confirmRide(ride?._id).then((msg) => {
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId === user?._id);
                if (!passenger) return oldRide;
                passenger.status = PASSENGER_STATUS.CONFIRMED;
                return oldRide;
            })
            showSuccess({ message: msg });
        }).catch(err => showError({ message: err.message }));
    }
    const handleRideBookingCancel = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will cancel your ride booking",
            confirmBtnText: "Cancel Booking",
        });
        if (!isConfirmed) return;

        cancelRideBooking(ride._id).then((msg) => {
            showSuccess({ message: msg });
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId.toString() === user._id);
                if (!passenger) return oldRide;
                passenger.status = PASSENGER_STATUS.CANCELLED;
                return oldRide;
            })
        }).catch(err => showError({ message: err.message }));
    }

    // Driver Side -> Ride Level Handlers
    const handleStartWholeRide = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will start your ride and notify all the passengers",
            confirmBtnText: "Confirm",
            cancelBtnText: "Cancel",
            icon: "question",
        });
        if (!isConfirmed) return;
        startWholeRide(ride?._id).then((msg) => {
            setRide(oldRide => {
                oldRide.status = RIDE_STATUS.STARTED;
                oldRide.passengers = oldRide.passengers.map(p => {
                    if ([PASSENGER_STATUS.BOOKED, PASSENGER_STATUS.REQUESTED].includes(p.status)) {
                        p.status = PASSENGER_STATUS.REJECTED;
                    }
                    return p;
                });
                return oldRide;
            });
            showSuccess({ message: msg });
        }).catch(err => showError({ message: err.message }));
    }
    const handleEndWholeRide = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will end your ride and you will be able to withdraw your funds after 24 hours",
            confirmBtnText: "Confirm",
            cancelBtnText: "Cancel",
            icon: "question",
        });
        if (!isConfirmed) return;

        endWholeRide(ride?._id).then((msg) => {
            setRide(ride => ({ ...ride, status: RIDE_STATUS.COMPLETED }));
            showSuccess({ message: msg });
        }).catch(err => showError({ message: err.message }));
    }
    const handleCancelWholeRide = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will end your ride and you will be able to withdraw your funds after 24 hours",
            confirmBtnText: "Confirm",
            cancelBtnText: "Cancel",
            icon: "question",
        });
        if (!isConfirmed) return;

        cancelWholeRide(ride?._id).then((msg) => {
            setRide(ride => ({ ...ride, status: RIDE_STATUS.CANCELLED }));
            showSuccess({ message: msg });
        }).catch(err => showError({ message: err.message }));
    }

    // Driver Side -> Passenger Level Handlers
    const handleRideApprove = async (passengerId) => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will prompt the passenger to confirm your ride by making payment. You won't be able to edit the ride later.",
            confirmBtnText: "Approve",
            icon: "question",
        });
        if (!isConfirmed) return;
        const payload = {
            passengerId,
            isApproved: true,
        }
        updatePassengerStatus(ride._id, payload).then((msg) => {
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId === passengerId);
                if (!passenger) return oldRide;
                passenger.status = PASSENGER_STATUS.BOOKED;
                return oldRide;
            })
            showSuccess({ message: "Passenger approved successfully. Please wait for the passenger to make the payment." });
        }).catch(err => showError({ message: err.message }));
    }
    const handleRideReject = async (passengerId) => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This will notify the passenger about your rejection",
            confirmBtnText: "Reject Ride",
        });
        if (!isConfirmed) return;
        const payload = {
            passengerId,
            isApproved: false,
        }
        updatePassengerStatus(ride._id, payload).then((msg) => {
            setRide(oldRide => {
                const passenger = oldRide.passengers.find(p => p.passengerId === passengerId);
                if (!passenger) return oldRide;
                passenger.status = PASSENGER_STATUS.REJECTED;
                return oldRide;
            })
            showSuccess({ message: "Passenger rejected successfully." });
        }).catch(err => showError({ message: err.message }));
    }
    const handleSendOtpToPassenger = async (passengerId) => {
        // const { isConfirmed } = await showConfirmationDialog({
        //     message: "",
        //     confirmBtnText: "Start Passenger Ride",
        //     cancelBtnText: "Cancel"
        // });
        // if (!isConfirmed) return;
        // sendOtpToPassenger(ride?._id, passengerId)
    }
    const openOtpInputModal = () => {
        window.Swal.fire({
            title: 'Enter OTP',
            input: "number",
            inputValidator: (value) => {
                if (!value) {
                    return "You need to enter the OTP!";
                }
                if(value.length!==6){
                    return "OTP must have 6 digits";
                }
            },
            showConfirmButton: false,
            // showCloseButton: true,
            // showCancelButton: false,
            // focusConfirm: false,
            // allowOutsideClick: false,
        });
    };
    const handleVerifyOTP = (otp) => {
        // Add your OTP verification logic here
        console.log('Verifying OTP:', otp);

        // For demo purposes, close the modal after verifying
        window.Swal.close();
    };

    const handleStartPassengerRide = async (passengerId) => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "You will have to enter the OTP that is sent to the passenger",
            confirmBtnText: "Start Passenger Ride",
            cancelBtnText: "Cancel"
        });
        if (!isConfirmed) return;

        openOtpInputModal();

        // setRide(oldRide => {
        //     const pIndex = oldRide.passengers.findIndex(p => p.passengerId === passengerId);
        //     if (pIndex > -1) {
        //         oldRide.passengers[pIndex] = { ...oldRide.passengers[pIndex], status: PASSENGER_STATUS.STARTED };
        //     }
        //     return { ...oldRide };
        // })
    }
    const handleEndPassengerRide = async (passengerId) => {
        const { isConfirmed } = await showConfirmationDialog({
            message: "This is mark the passenger's ride as completed",
            confirmBtnText: "End Passenger Ride",
            cancelBtnText: "Cancel"
        });
        if (!isConfirmed) return;
        setRide(oldRide => {
            const pIndex = oldRide.passengers.findIndex(p => p.passengerId === passengerId);
            if (pIndex > -1) {
                oldRide.passengers[pIndex] = { ...oldRide.passengers[pIndex], status: PASSENGER_STATUS.COMPLETED };
            }
            return { ...oldRide };
        })
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
                        finalRide.destination = {
                            index: params.destination.index,
                            primaryText: params.destination.text[0],
                            secondaryText: params.destination.text[1],
                        };
                        if (params.toCoords) {
                            const destiCoords = finalRide.locations.coordinates[params.destination?.index] || [];
                            finalRide.destination.distance = haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]);
                        }
                    }
                    // X to B
                    else if (!params.destination) {
                        // console.log("Ride: A------X======Y======B");

                        // Departure Computed Property
                        finalRide.departure = {
                            index: params.departure.index,
                            primaryText: params.departure.text[0],
                            secondaryText: params.departure.text[1],
                        };
                        if (params.fromCoords) {
                            const departCoords = finalRide.locations.coordinates[params.departure?.index] || [];
                            finalRide.departure.distance = haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]);
                        }
                    }
                    // X to Y
                    else {
                        // console.log("Ride: A------X======Y------B");
                        // Departure Computed Property
                        finalRide.departure = {
                            index: params.departure.index,
                            primaryText: params.departure.text[0],
                            secondaryText: params.departure.text[1],
                        };
                        if (params.fromCoords) {
                            const departCoords = finalRide.locations.coordinates[params.departure?.index] || [];
                            finalRide.departure.distance = haversineDistance(params.fromCoords[1], params.fromCoords[0], departCoords[1], departCoords[0]);
                        }

                        // Destination Computer Property
                        finalRide.destination = {
                            index: params.destination.index,
                            primaryText: params.destination.text[0],
                            secondaryText: params.destination.text[1],
                        };
                        if (params.toCoords) {
                            const destiCoords = finalRide.locations.coordinates[params.destination?.index] || [];
                            finalRide.destination.distance = haversineDistance(params.toCoords[1], params.toCoords[0], destiCoords[1], destiCoords[0]);
                        }

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
                            ?
                            <>
                                {Boolean(currentPassenger) && <>
                                    <Divider variant="fullWidth" flexItem />
                                    <Box>
                                        <Typography gutterBottom variant="h4" color={'primary'}>Your Ride</Typography>
                                        <List>
                                            <ListItem
                                                // LinkComponent={Link}
                                                // to={ROUTE_USER_DETAILS.replace(":userId", ride.publisher._id)}
                                                sx={{ borderRadius: '16px', my: 1, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                                <ListItemIcon>
                                                    <IconButton LinkComponent={Link} to={`${ROUTE_USER_DETAILS.replace(":userId", currentPassenger.passengerId)}`} target="_blank">
                                                        <Avatar sx={{ height: '72px', width: '72px' }}>
                                                            <Box component={'img'} sx={{ WebkitTextStrokeWidth: '1px' }} src={currentPassenger.profilePicture} alt="My avatar" />
                                                        </Avatar>
                                                    </IconButton>
                                                    {/* <History  /> */}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                                                        <Stack spacing={2}>
                                                            <Box aria-label="Name, Amount & Seats" display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                                                                <SmartTypography variant="h4">
                                                                    {`${currentPassenger.firstName} ${currentPassenger.lastName}`}
                                                                </SmartTypography>
                                                                <Stack direction={'row'} spacing={2}>
                                                                    <Tooltip title={`${currentPassenger.occupiedSeats} ${currentPassenger.occupiedSeats > 1 ? "seats" : "seat"} occupied`}>
                                                                        <Box display={'flex'} gap={0.5} alignItems={'center'}>
                                                                            <AirlineSeatReclineExtra />
                                                                            <Typography fontWeight={600}>
                                                                                {currentPassenger.occupiedSeats}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Tooltip>
                                                                    <SmartTypography variant="h3" color={'success.main'}>
                                                                        ₹{currentPassenger.amount}
                                                                    </SmartTypography>
                                                                </Stack>
                                                            </Box>
                                                            <Box aria-label="Departure & Destination Info" display={'flex'} flexDirection={{ xs: "column", md: 'row' }} alignItems={'center'} gap={1} color={'text.secondary'}>
                                                                <SmartTypography gutterBottom>
                                                                    {currentPassenger.departure?.secondaryText}
                                                                </SmartTypography>
                                                                <MHidden width="mdDown">
                                                                    <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                                                </MHidden>
                                                                <MHidden width="mdUp">
                                                                    <ArrowCircleDown sx={{ color: 'text.disabled' }} />
                                                                </MHidden>
                                                                <SmartTypography gutterBottom>
                                                                    {currentPassenger.destination?.secondaryText}
                                                                </SmartTypography>
                                                            </Box>
                                                            {currentPassenger.status === PASSENGER_STATUS.BOOKED ?
                                                                <Stack spacing={3} direction={'column'}>
                                                                    <Box display={'flex'} alignItems={'center'} gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                                                                        <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={{ xs: 'center', md: 'start' }}>
                                                                            {PASSENGER_STATUS_ICONS[currentPassenger.status]}
                                                                            <Typography fontWeight={500}>{capitalizeWords(currentPassenger.status)}</Typography>
                                                                        </Box>
                                                                        <SmartTypography textAlign={'center'} color={'text.secondary'}>{STATUS_DESCRIPTION_FOR_PASSENGER[currentPassenger.status]}</SmartTypography>
                                                                    </Box>
                                                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                                                        <Button onClick={handleRideConfirm} variant="contained" color="success" startIcon={<CurrencyRupee />}>Confirm Ride</Button>
                                                                        <Button onClick={handleRideBookingCancel} variant="outlined" color="error" startIcon={<Cancel />}>Cancel</Button>
                                                                    </Stack>
                                                                </Stack>
                                                                :
                                                                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={'center'}>
                                                                    <>
                                                                        <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={{ xs: 'center', md: 'start' }}>
                                                                            {PASSENGER_STATUS_ICONS[currentPassenger.status]}
                                                                            <Typography fontWeight={500}>{capitalizeWords(currentPassenger.status)}</Typography>

                                                                        </Box>
                                                                        <Typography textAlign={'center'} color={'text.secondary'}>{STATUS_DESCRIPTION_FOR_PASSENGER[currentPassenger.status]}</Typography>
                                                                    </>
                                                                    {[PASSENGER_STATUS.REQUESTED, PASSENGER_STATUS.CONFIRMED].includes(currentPassenger.status) &&
                                                                        <Button sx={{ ml: { md: 'auto !important' } }} onClick={handleRideBookingCancel} variant="outlined" color="error" startIcon={<Cancel />}>Cancel Booking</Button>
                                                                    }
                                                                </Stack>
                                                            }
                                                        </Stack>
                                                    </Box>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </>}
                                {coTravellers.length > 0 &&
                                    <>
                                        <Divider variant="fullWidth" flexItem />
                                        <Box aria-label="co-travellers section">
                                            <Typography gutterBottom variant="h4" color={'primary'}>Co-travellers</Typography>
                                            <List>
                                                {coTravellers.map(passenger => {
                                                    if (passenger.passengerId === user._id) return null;
                                                    return <ListItemButton
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
                                                                <SmartTypography>
                                                                    {`${passenger.firstName} ${passenger.lastName}`}
                                                                </SmartTypography>
                                                            </Box>
                                                            <Box display={'flex'} alignItems={'center'} gap={1} color={'text.secondary'}>
                                                                <SmartTypography>
                                                                    {passenger.departure?.secondaryText}
                                                                </SmartTypography>
                                                                <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                                                <SmartTypography>
                                                                    {passenger.destination?.secondaryText}
                                                                </SmartTypography>
                                                            </Box>
                                                        </ListItemText>
                                                        <ListItemIcon sx={{ justifyContent: 'right' }}>
                                                            <KeyboardArrowRight />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                })}
                                            </List>
                                        </Box>
                                    </>
                                }
                            </>
                            :
                            ride.passengers.length > 0 &&
                            <>
                                <Divider variant="fullWidth" flexItem />
                                <Box aria-label="co-travellers section">
                                    <Typography gutterBottom variant="h4" color={'primary'}>Passengers</Typography>
                                    <List>
                                        {ride.passengers.map((passenger, passIdx) => {
                                            const StatusIcon = PASSENGER_STATUS_ICONS[passenger.status] || <QuestionMark color="secondary" />;
                                            return <React.Fragment key={passenger.passengerId}>
                                                <ListItem
                                                    // key={passenger.passengerId}
                                                    sx={{ borderRadius: '16px', my: 1, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
                                                    <ListItemIcon>
                                                        <IconButton LinkComponent={Link} to={`${ROUTE_USER_DETAILS.replace(":userId", passenger.passengerId)}`} target="_blank">
                                                            <Avatar sx={{ height: '72px', width: '72px' }}>
                                                                <Box component={'img'} sx={{ WebkitTextStrokeWidth: '1px' }} src={passenger.profilePicture} alt="Driver avatar" />
                                                            </Avatar>
                                                        </IconButton>
                                                        {/* <History  /> */}
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ width: '100%' }}>
                                                        <Box display={'flex'} flexDirection={'column'} gap={2}>
                                                            <Stack spacing={2}>
                                                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                                                                    <SmartTypography variant="h4">
                                                                        {`${passenger.firstName} ${passenger.lastName}`}
                                                                    </SmartTypography>
                                                                    <Stack direction={'row'} spacing={2}>
                                                                        <Tooltip title={`${passenger.occupiedSeats} ${passenger.occupiedSeats > 1 ? "seats" : "seat"} occupied`}>
                                                                            <Box display={'flex'} gap={0.5} alignItems={'center'}>
                                                                                <AirlineSeatReclineExtra />
                                                                                <Typography fontWeight={600}>
                                                                                    {passenger.occupiedSeats}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Tooltip>
                                                                        <SmartTypography variant="h3" color={'success.main'}>
                                                                            ₹{passenger.amount}
                                                                        </SmartTypography>
                                                                    </Stack>
                                                                </Box>
                                                                <Box display={'flex'} flexDirection={{ xs: "column", sm: 'row' }} alignItems={{ xs: 'center', sm: 'start' }} gap={1} color={'text.secondary'}>
                                                                    <SmartTypography gutterBottom>
                                                                        {passenger.departure?.secondaryText}
                                                                    </SmartTypography>
                                                                    <MHidden width="smDown">
                                                                        <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                                                    </MHidden>
                                                                    <MHidden width="smUp">
                                                                        <ArrowCircleDown sx={{ color: 'text.disabled' }} />
                                                                    </MHidden>
                                                                    <SmartTypography gutterBottom>
                                                                        {passenger.destination?.secondaryText}
                                                                    </SmartTypography>
                                                                </Box>
                                                                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
                                                                            <Typography textAlign={'center'} color={'text.secondary'}>{STATUS_DESCRIPTION_FOR_DRIVER[passenger.status]}</Typography>
                                                                        </>}
                                                                </Stack>
                                                                {ride.status === RIDE_STATUS.STARTED && <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                                                    {passenger.status === PASSENGER_STATUS.CONFIRMED && <Button
                                                                        onClick={() => handleStartPassengerRide(passenger.passengerId)}
                                                                        variant="contained"
                                                                        color="success"
                                                                        // size="large" 
                                                                        sx={{ borderRadius: '24px', px: 4, py: 1.2, fontSize: '16px !important' }}
                                                                        endIcon={<LocalTaxi />}
                                                                    >
                                                                        Start Passenger Ride
                                                                    </Button>}

                                                                    {passenger.status === PASSENGER_STATUS.STARTED && <Button
                                                                        onClick={() => handleEndPassengerRide(passenger.passengerId)}
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        endIcon={<WhereToVote />}
                                                                    >
                                                                        End Passenger Ride
                                                                    </Button>}
                                                                </Stack>}
                                                            </Stack>
                                                        </Box>
                                                    </ListItemText>
                                                </ListItem>
                                                {passIdx !== ride.passengers.length - 1 && <Divider variant="middle" />}
                                            </React.Fragment>
                                        }
                                        )}
                                    </List>
                                </Box>
                            </>
                        }
                        {isOwner ?
                            <>
                                <Divider variant="fullWidth" flexItem />
                                {/* <Typography gutterBottom variant="h4" color={'primary'}>Ride Controls</Typography> */}
                                <Box py={2} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} justifyContent={'center'} alignItems={'center'}>
                                    {canEditRide && <Button
                                        LinkComponent={Link}
                                        to={ROUTE_RIDE_EDIT.replace(":rideId", ride._id)}
                                        size="large"
                                        sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }}
                                        color="secondary"
                                        variant="contained"
                                        endIcon={<Edit />}
                                    >
                                        Edit Ride
                                    </Button>}


                                    {ride?.status === RIDE_STATUS.PUBLISHED && <>
                                        <Button
                                            onClick={handleStartWholeRide}
                                            size="large"
                                            sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }}
                                            color="success"
                                            variant="contained"
                                            endIcon={<PlayCircleOutline />}>
                                            Start Ride
                                        </Button>
                                        <Button
                                            onClick={handleCancelWholeRide}
                                            size="large"
                                            sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }}
                                            color="error"
                                            variant="outlined"
                                            endIcon={<Cancel />}>
                                            Cancel Ride
                                        </Button>
                                    </>
                                    }
                                    {ride?.status === RIDE_STATUS.STARTED && <Button
                                        onClick={handleEndWholeRide}
                                        size="large"
                                        sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }}
                                        color="info"
                                        variant="contained"
                                        endIcon={<NoCrash />}>
                                        End Ride
                                    </Button>}
                                    {ride?.status === RIDE_STATUS.COMPLETED && <Box display={'flex'} gap={1} alignItems={'center'}>
                                        <Typography
                                            variant="h4"
                                            fontWeight={600}
                                            color={'success.main'}
                                        >Ride Completed</Typography>
                                        <NoCrash color="success" />
                                    </Box>}
                                    {ride?.status === RIDE_STATUS.CANCELLED && <Box display={'flex'} gap={1} alignItems={'center'}>
                                        <Typography
                                            variant="h4"
                                            fontWeight={600}
                                            color={'error'}
                                        >Ride Cancelled</Typography>
                                        <Cancel color="error" />
                                    </Box>}
                                </Box>
                            </>
                            :
                            !currentPassenger && <>
                                <Divider variant="fullWidth" flexItem />
                                <Box mx={'auto'} py={2}>
                                    <LoadingButton loading={rideLoading} onClick={handleRequestRide} size="large" sx={{ borderRadius: '24px', px: 4, py: 1.5, fontSize: '16px !important' }} color="secondary" variant="contained" endIcon={<Luggage />}>Book Ride</LoadingButton>
                                </Box>
                            </>
                        }
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