
import { useTheme } from "@emotion/react";
import { Close, Route } from "@mui/icons-material";
import { Badge, Box, Card, CardContent, CardHeader, Fab, IconButton, ListItem, ListItemIcon, ListItemText, Modal, Slide, Typography, Zoom, styled, useMediaQuery } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import MapsApiLoader from "Components/MapItems/MapsApiLoader";
import MyGoogleMap from "Components/MapItems/MyGoogleMap";
import { PREFERENCES } from "Store/constants";
import { useState } from "react";

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

function RideDetailsSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isMapVisible, setIsMapVisible] = useState(false);
    const waypoints = [
        {
            location: {
                primaryText: "Ahmedabad, Gujarat",
                secondaryText: "Block-J",
                fullName: "Block-J, Ahmedabad, Gujarat",
                time: "8:00"
            }
        },
        {
            location: {
                primaryText: "Surat, Gujarat",
                secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                fullName: "Railway Station Cir, Surat, Gujarat",
                time: "11:40"
            }
        },
        {
            location: {
                primaryText: "Mahabaleshwar, Mumbai",
                secondaryText: "Green Gairy Bungalow, Lodwick Point Rd",
                fullName: "Green Gairy Bungalow, Mahabaleshwar, Mumbai",
                time: "" // You can fill in the time if needed
            }
        },
        {
            location: {
                primaryText: "Goa, India",
                secondaryText: "Goa Market",
                fullName: "Goa, India",
                time: "" // You can fill in the time if needed
            }
        },
        {
            location: {
                primaryText: "Kerala, India",
                secondaryText: "Kele ka jaad", // You can fill in additional details if needed
                fullName: "Kerala, India",
                time: "" // You can fill in the time if needed
            }
        },
    ];

    const handleShowMap = () => {
        setIsMapVisible(true);
    }
    const handleHideMap = () => {
        setIsMapVisible(false);
    }

    return (<>
        <Box position={'absolute'} height={'100%'} width={'100%'}>
            <MapsApiLoader>
                <Box display={'flex'} width={'100%'} height={'100%'}>
                    <Box width={'100%'} sx={{ overflowX: 'hidden' }}>
                        <RouteList waypoints={waypoints} price={540} startIndex={0} endIndex={3} />
                        {PREFERENCES.map((pref, index) => {
                            return <ListItem key={index}>
                                <ListItemIcon><pref.Icon /></ListItemIcon>
                                <ListItemText>{pref.title}</ListItemText>
                            </ListItem>
                        })}
                    </Box>
                    {!isMobile ? <Box width={'100%'}>
                        <MyGoogleMap
                        // from={locations[ID_RIDE_FROM]}
                        // to={locations[ID_RIDE_TO]}
                        // waypoints={waypoints}
                        // pickup={locations[ID_RIDE_PICKUP]}
                        // dropoff={locations[ID_RIDE_DROPOFF]}
                        />
                    </Box>
                        : <>
                            <Zoom in={isMobile} sx={{ position: 'absolute', right: theme.spacing(2), bottom: theme.spacing(2) }}>
                                <StyledBadge color="error" variant="dot">
                                    <Fab onClick={handleShowMap} color="secondary">
                                        <Route fontSize="large" />
                                    </Fab>
                                </StyledBadge>
                            </Zoom>

                            <Modal open={isMapVisible} onClose={handleHideMap} keepMounted>
                                <Slide direction="up" in={isMapVisible} mountOnEnter unmountOnExit={false}>
                                    <Box component={Card} position={'absolute'} height={'100%'} width={'100%'} borderRadius={'0'} display={'flex'} flexDirection={'column'}>
                                        <CardHeader
                                            sx={{ py: 2, px: 3 }}
                                            title={<Typography variant="h4" color={'primary'}>Route</Typography>}
                                            action={<IconButton onClick={handleHideMap}>
                                                <Close />
                                            </IconButton>}
                                        />
                                        <CardContent sx={{ flexGrow: 1, px: 0, py: "0 !important" }}>
                                            <MyGoogleMap
                                            // from={locations[ID_RIDE_FROM]}
                                            // to={locations[ID_RIDE_TO]}
                                            // waypoints={waypoints}
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
        </Box>
    </>);
}

export default RideDetailsSection;