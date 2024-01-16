import { DirectionsWalk } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";

function RouteList({
    waypoints = [],
    startIndex = 0,
    endIndex = waypoints.length - 1,
    price,
}) {

    const color = "secondary.main"
    return (<>
        <List
        // sx={{ bgcolor: 'background.paper' }}
        >
            {waypoints.map((waypoint, index) => {
                const isActive = index >= startIndex && index <= endIndex;
                const distanceIconColor = waypoint.distance <= 5 ? "success.main" : waypoint.distance <= 10 ? "warning.main" : "error.main";
                return <ListItem key={index} sx={{ py: 0, alignItems: "stretch" }} >

                    {/* Time Text */}
                    <Box py={1} sx={{ width: "48px", minWidth: '60px' }}>
                        <Typography textAlign={'center'} fontWeight={500} color={!isActive && 'text.disabled'}>
                            {waypoint.date}
                        </Typography>
                        <Typography textAlign={'center'} fontWeight={500} variant="body2" color={!isActive ? 'text.disabled' : 'text.secondary'}>
                            {waypoint.time}
                        </Typography>
                    </Box>

                    {/* Route Line  O----O====O====O----O  */}
                    <Box mx={1} position={"relative"} display={"flex"} alignItems={'center'} flexDirection={"column"} minHeight={"32px"}>
                        <Box
                            width={'4px'}
                            height={'13px'}
                            bgcolor={index > 0 ? (index > startIndex && index <= endIndex) ? color : "background.disabled" : ""}
                        />
                        <Box
                            position="absolute"
                            top="12px"
                            left=" 50%"
                            sx={{ transform: "translateX(-50%)" }}
                        >
                            <Box
                                width={"10px"}
                                height={"10px"}
                                border={"2px solid"}
                                bgcolor={"primary.contrastText"}
                                borderColor={isActive ? color : "background.disabled"}
                                borderRadius={"50%"}
                            />
                        </Box>
                        <Box
                            width={'4px'}
                            height={'13px'}
                            bgcolor={index < waypoints.length - 1 ? (index >= startIndex && index < endIndex) ? color : "background.disabled" : ""}
                            flex={"1 1 0%"}
                        />
                    </Box>

                    {/* Place Text */}
                    <Box py={1} pr={3} flexGrow={1}>
                        {isActive ? <>
                            <Typography color={'primary'} fontWeight={'500'}>
                                {waypoint.primaryText}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {waypoint.secondaryText}
                            </Typography>
                        </> :
                            <Typography color={'primary'} fontWeight={'500'} sx={{ color: 'text.disabled' }}>
                                {waypoint.secondaryText}
                            </Typography>
                        }

                        {[startIndex, endIndex].includes(index) && waypoint.distance && <Box display={'flex'} gap={1} alignItems={'center'}>
                            <Box p={0.2} bgcolor={distanceIconColor} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'}>
                                <DirectionsWalk fontSize="small" sx={{ color: 'white' }} />
                            </Box>
                            <Typography color={'text.secondary'}>{waypoint.distance?.toFixed(1)} km away from {startIndex === index ? "depature" : "destination"}</Typography>
                        </Box>}
                    </Box>

                </ListItem>
            })}
        </List >
    </>);
}

export default RouteList;