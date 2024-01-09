import { AirlineSeatReclineExtra } from "@mui/icons-material";
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import useRideApi from "Components/Hooks/useRideApi";
import { API_RIDES_BOOKED, ROUTE_RIDES } from "Store/constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookedRidesHistorySection() {
    const { loading, getRidesHistory } = useRideApi();
    const [bookedRides, setBookedRides] = useState([]);
    const [rideWaypoints, setRideWaypoints] = useState([]);

    const getRedirectUrl = (ride) => {
        const params = {
            departure: JSON.stringify({
                index: ride.departure.index,
                text: [ride.departure.primaryText, ride.departure.secondaryText].join("--"),
            }),
            destination: JSON.stringify({
                index: ride.destination.index,
                text: [ride.destination.primaryText, ride.destination.secondaryText].join("--"),
            })
        }
        if (ride.from?.coords && ride.from?.placeId) {
            params.fromCoords = JSON.stringify(ride.from.coords);
            params.fromPlaceId = ride.from.placeId;
        }
        if (ride.to?.coords && ride.to?.placeId) {
            params.toCoords = JSON.stringify(ride.to.coords);
            params.toPlaceId = ride.to.placeId;
        }
        const options = new URLSearchParams(params);
        return `${ROUTE_RIDES}/${ride._id}?${options.toString()}`;
    }


    useEffect(() => {
        getRidesHistory(API_RIDES_BOOKED).then(ridesHistory => {
            const rides = ridesHistory.map(ride => {
                ride.departureDatetime = new Date(ride.departureDatetime);
                ride.date = format(ride.departureDatetime, "dd MMM");
                ride.time = format(ride.departureDatetime, "hh:mm a");
                return ride;
            })
            const waypoints = ridesHistory.map(ride => {
                const result = [];
                const isSameDeparture = ride.departure.index === 0;
                const isSameDestination = ride.destination.index === ride.driverDestination.index;

                if (isSameDeparture && isSameDestination) {
                    result.push({ startIndex: 0, endIndex: 1 })
                    result.push(
                        {
                            primaryText: ride.departure.primaryText,
                            secondaryText: ride.departure.secondaryText,
                            date: ride.date,
                            time: ride.time,
                        },
                        {
                            primaryText: ride.destination.primaryText,
                            secondaryText: ride.destination.secondaryText,
                        },
                    )
                }
                else if (isSameDeparture) {
                    result.push({ startIndex: 0, endIndex: 1 })
                    result.push(
                        {
                            primaryText: ride.departure.primaryText,
                            secondaryText: ride.departure.secondaryText,
                            date: ride.date,
                            time: ride.time,
                        },
                        {
                            primaryText: ride.destination.primaryText,
                            secondaryText: ride.destination.secondaryText,
                        },
                        {
                            primaryText: ride.driverDestination.primaryText,
                            secondaryText: ride.driverDestination.secondaryText,
                        },
                    )
                }
                else if (isSameDestination) {
                    result.push({ startIndex: 1, endIndex: 2 })
                    result.push(
                        {
                            primaryText: ride.driverDeparture.primaryText,
                            secondaryText: ride.driverDeparture.secondaryText,
                            date: ride.date,
                            time: ride.time,
                        },
                        {
                            primaryText: ride.departure.primaryText,
                            secondaryText: ride.departure.secondaryText,
                        },
                        {
                            primaryText: ride.destination.primaryText,
                            secondaryText: ride.destination.secondaryText,
                        },
                    )
                } else {
                    result.push({ startIndex: 1, endIndex: 2 })
                    result.push(
                        {
                            primaryText: ride.driverDeparture.primaryText,
                            secondaryText: ride.driverDeparture.secondaryText,
                            date: ride.date,
                            time: ride.time,
                        },
                        {
                            primaryText: ride.departure.primaryText,
                            secondaryText: ride.departure.secondaryText,
                        },
                        {
                            primaryText: ride.destination.primaryText,
                            secondaryText: ride.destination.secondaryText,
                        },
                        {
                            primaryText: ride.driverDestination.primaryText,
                            secondaryText: ride.driverDestination.secondaryText,
                        },
                    )
                }
                return result;
            })
            setBookedRides(rides);
            setRideWaypoints(waypoints);
        }).catch(err => {
            console.log(err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (!loading ? <Stack>
        {bookedRides.length > 0 ?
            bookedRides.map((ride, index) =>
                <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                    <CardActionArea LinkComponent={Link} to={getRedirectUrl(ride)}>
                        <CardContent sx={{ p: 1 }}>
                            <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                <Box>
                                    <RouteList waypoints={rideWaypoints[index].slice(1)} startIndex={rideWaypoints[index][0]?.startIndex} endIndex={rideWaypoints[index][0]?.endIndex} />
                                </Box>

                                <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                    <Typography variant="h4">{`₹${ride.amount}`}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                                <Avatar src={ride.publisher.profilePicture} alt="Publisher Profile">
                                </Avatar>
                                <Typography variant="subtitle1">{`${ride.publisher.firstName} ${ride.publisher.lastName}`}</Typography>
                                <Tooltip title={`${ride.occupiedSeats} ${ride.occupiedSeats > 1 ? "seats" : "seat"} occupied`}>
                                    <Box ml={'auto !important'} display={'flex'} gap={0.5} alignItems={'center'}>
                                        <AirlineSeatReclineExtra />
                                        <Typography variant="subtitle1">{ride.occupiedSeats}</Typography>
                                    </Box>
                                </Tooltip>
                            </Stack>
                        </CardActions>
                    </CardActionArea>
                </Card>
            ) :
            <>
                No Booked Rides Found
            </>
        }
    </Stack> : <LinearProgress />);
}

export default BookedRidesHistorySection;