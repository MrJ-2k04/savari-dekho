import { Box, List, ListItem, Typography } from "@mui/material";

function RouteList({
    waypoints = [],
    startIndex = 0,
    endIndex = waypoints.length,
    price,
}) {

    const color = "secondary.main"

    return (<>
        <List
            // sx={{ bgcolor: 'background.paper' }}
        >
            {waypoints.map((waypoint, index) => {
                const isActive = index >= startIndex && index <= endIndex;
                return <ListItem key={index} sx={{ py: 0, alignItems: "stretch" }} >

                    {/* Time Text */}
                    <Box py={1} sx={{ width: "48px", minWidth: '48px' }}>
                        <Typography textAlign={'center'} fontWeight={500} color={!isActive && 'text.disabled'}>
                            {waypoint?.location.time}
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
                        <Typography color={'primary'} fontWeight={'500'} sx={{ color: isActive ? "" : "text.disabled" }}>
                            {waypoint.location?.primaryText}
                        </Typography>

                        {isActive && <Typography variant="body2" color="text.secondary">
                            {waypoint.location?.secondaryText}
                        </Typography>}
                    </Box>
                </ListItem>
            })}
        </List>
    </>);
}

export default RouteList;