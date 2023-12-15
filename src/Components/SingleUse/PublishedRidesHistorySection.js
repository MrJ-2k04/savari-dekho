import { AirlineSeatReclineExtra } from "@mui/icons-material";
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import useApi from "Components/Hooks/useApi";
import { API_RIDES_PUBLISHED, ROUTE_RIDES } from "Store/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PublishedRidesHistorySection() {
    const { loading, getRidesHistory } = useApi();
    const [publishedRides, setPublishedRides] = useState([]);

    useEffect(() => {
        getRidesHistory(API_RIDES_PUBLISHED).then(ridesHistory => {
            setPublishedRides(ridesHistory);
        }).catch(err => {
            console.log(err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (!loading ? <Stack>
        {publishedRides.map((ride, index) =>
            <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                <CardActionArea LinkComponent={Link} to={`${ROUTE_RIDES}/${ride.id}`}>
                    <CardContent sx={{ p: 1 }}>
                        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                            <Box>
                                <RouteList waypoints={[
                                    {
                                        location: {
                                            primaryText: ride.from?.primaryText,
                                            time: ride.departureDatetime,
                                            // secondaryText: "Block-J",
                                            // fullName: "Block-J, Ahmedabad, Gujarat",
                                        }
                                    },
                                    {
                                        location: {
                                            primaryText: ride.to?.primaryText,
                                            // time: ride.toTime,
                                            // secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                                            // fullName: "Railway Station Cir, Surat, Gujarat",
                                        }
                                    },
                                ]} />
                            </Box>

                            <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                <Typography variant="h4">{`₹${ride.totalPrice}`}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                            {/* <Avatar>
                                <img src={ride.publisher.profileUrl} alt="Publisher Profile" />
                            </Avatar> */}
                            {/* <Typography variant="subtitle1">{ride.publisher.name}</Typography> */}
                            <Tooltip title={`Max ${ride.seats} seats available`}>
                                <Box ml={'auto !important'} display={'flex'} gap={0.5} alignItems={'center'}>
                                    <AirlineSeatReclineExtra />
                                    <Typography variant="subtitle1">{ride.totalEmptySeats}</Typography>
                                </Box>
                            </Tooltip>
                        </Stack>
                    </CardActions>
                </CardActionArea>
            </Card>
        )}
    </Stack> : <LinearProgress />);
}

export default PublishedRidesHistorySection;