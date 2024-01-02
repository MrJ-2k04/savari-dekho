import { Box, Card, CardActionArea, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import useRideApi from "Components/Hooks/useRideApi";
import { API_RIDES_BOOKED, ROUTE_RIDES } from "Store/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookedRidesHistorySection() {
    const { loading, getRidesHistory } = useRideApi();
    const [bookedRides, setBookedRides] = useState([]);

    useEffect(() => {
        getRidesHistory(API_RIDES_BOOKED).then(ridesHistory => {
            setBookedRides(ridesHistory);
        }).catch(err => {
            console.log(err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (!loading ? <Stack>
        {bookedRides.length > 0 ?
            bookedRides.map((ride, index) =>
                <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                    <CardActionArea LinkComponent={Link} to={`${ROUTE_RIDES}/${ride.id}`}>
                        <CardContent sx={{ p: 1 }}>
                            <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                <Box>
                                    <RouteList waypoints={[
                                        {
                                            location: {
                                                primaryText: ride.from,
                                                time: ride.fromTime,
                                                // secondaryText: "Block-J",
                                                // fullName: "Block-J, Ahmedabad, Gujarat",
                                            }
                                        },
                                        {
                                            location: {
                                                primaryText: ride.to,
                                                time: ride.toTime,
                                                // secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                                                // fullName: "Railway Station Cir, Surat, Gujarat",
                                            }
                                        },
                                    ]} />
                                </Box>

                                <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                    <Typography variant="h4">{`₹${ride.price}`}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        {/* <CardActions>
                        <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                            <Avatar>
                                <img src={ride.publisher.profileUrl} alt="Publisher Profile" />
                            </Avatar>
                            <Typography variant="subtitle1">{ride.publisher.name}</Typography>
                            <Tooltip title={`Max ${ride.seats} seats available`}>
                                <Box ml={'auto !important'} display={'flex'} gap={0.5} alignItems={'center'}>
                                    <AirlineSeatReclineExtra />
                                    <Typography variant="subtitle1">{ride.seats}</Typography>
                                </Box>
                            </Tooltip>
                        </Stack>
                    </CardActions> */}
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