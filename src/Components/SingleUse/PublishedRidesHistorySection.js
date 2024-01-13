import { AirlineSeatReclineExtra } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import useRideApi from "Components/Hooks/useRideApi";
import { API_RIDES_PUBLISHED, PASSENGER_FILTER_STATUS, ROUTE_RIDES } from "Store/constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function PublishedRidesHistorySection() {
    const { loading, getRidesHistory } = useRideApi();
    const [publishedRides, setPublishedRides] = useState([]);
    const [rideWaypoints, setRideWaypoints] = useState([]);

    useEffect(() => {
        getRidesHistory(API_RIDES_PUBLISHED).then(ridesHistory => {
            setPublishedRides(ridesHistory);
            setRideWaypoints(ridesHistory.map(ride => {
                const details = [
                    {
                        primaryText: ride.from.primaryText,
                        secondaryText: ride.from.secondaryText,
                    },
                    {
                        primaryText: ride.to.primaryText,
                        secondaryText: ride.to.secondaryText,
                    }
                ];
                const departureDatetime = new Date(ride.departureDatetime);
                if (typeof departureDatetime === 'object') {
                    details[0].time = format(departureDatetime, "hh:mm a");
                    details[0].date = format(departureDatetime, "dd MMM");
                }
                return details;
            }))
        }).catch(err => {
            console.log(err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (!loading ? <Stack>
        {publishedRides.length > 0 ?
            publishedRides.map((ride, index) =>
                <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                    <CardActionArea LinkComponent={Link} to={`${ROUTE_RIDES}/${ride._id}`}>
                        <CardContent sx={{ p: 1 }}>
                            <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                <Box>
                                    <RouteList waypoints={rideWaypoints[index]} />
                                </Box>

                                <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                    <Typography variant="h4">{`₹${ride.totalPrice}`}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                                <AvatarGroup max={3}>
                                    {ride.passengers
                                        .filter(p => PASSENGER_FILTER_STATUS.includes(p.status))
                                        .map((passenger, i) => <Avatar key={i} src={passenger.profilePicture}>
                                            {passenger.firstName?.[0]}
                                        </Avatar>)
                                    }
                                </AvatarGroup>
                                {/* <Avatar>
                                    <img src={ride.publisher?.profilePicture} alt="Publisher Profile" />
                                </Avatar> */}
                                {/* <Typography variant="subtitle1">{ride.publisher.name}</Typography> */}
                                <Tooltip title={`Max ${ride.totalEmptySeats} seats available`}>
                                    <Box ml={'auto !important'} display={'flex'} gap={0.5} alignItems={'center'}>
                                        <AirlineSeatReclineExtra />
                                        <Typography variant="subtitle1">{ride.totalEmptySeats}</Typography>
                                    </Box>
                                </Tooltip>
                            </Stack>
                        </CardActions>
                    </CardActionArea>
                </Card>
            )
            : <>
                No Published Rides found
            </>
        }
    </Stack> : <LinearProgress />);
}

export default PublishedRidesHistorySection;