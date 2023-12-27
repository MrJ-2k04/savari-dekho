import { useTheme } from "@emotion/react";
import { Close, Route } from "@mui/icons-material";
import { Badge, Box, Card, CardContent, CardHeader, Fab, IconButton, Modal, Slide, Typography, Zoom, styled, useMediaQuery } from "@mui/material";
import RideMapView from "Components/MapItems/RideMapView";
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

function RideRouteSection() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isMapVisible, setIsMapVisible] = useState(false);

    const handleShowMap = () => {
        setIsMapVisible(true);
    }
    const handleHideMap = () => {
        setIsMapVisible(false);
    }

    return (<>
        {/* {!isMobile ? */}
        <Box width={'100%'} position={'relative'}>
            <RideMapView
            // from={locations[ID_RIDE_FROM]}
            // to={locations[ID_RIDE_TO]}
            // waypoints={waypoints}
            // pickup={locations[ID_RIDE_PICKUP]}
            // dropoff={locations[ID_RIDE_DROPOFF]}
            />
        </Box>
        
        {/* : <>
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
                                <RideMapView
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
        } */}
    </>);
}

export default RideRouteSection;