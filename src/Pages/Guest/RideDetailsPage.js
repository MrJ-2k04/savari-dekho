import { TabContext } from "@mui/lab";
import { Box, Container, Tab, Tabs } from "@mui/material";
import MapsApiLoader from "Components/MapItems/MapsApiLoader";
import RideDetailsSection from "Components/SingleUse/RideDetailsSection";
import RideRouteSection from "Components/SingleUse/RideRouteSection";
import UserLayout from "Layout/User";
import { useState } from "react";

function RideDetailsPage() {

    const [activeTab, setActiveTab] = useState("1");
    const [rideState, setRideState] = useState(null);


    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };


    return (<UserLayout>
        <MapsApiLoader>
            <TabContext value={activeTab}>
                <Container maxWidth={'md'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0px 9px 6px -4px rgba(0,0,0,0.05)' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label="Details" value={"1"} />
                            <Tab label="Route" value={"2"} />
                        </Tabs>
                    </Box>
                </Container>
                <Box>
                    <Box display={activeTab !== "1" && "none"} sx={{ px: 0, py: { xs: 2, md: 3 } }}>
                        <Container maxWidth={'md'}>
                            <RideDetailsSection ride={rideState} onChange={setRideState} />
                        </Container>
                    </Box>
                    <Box display={activeTab !== "2" && "none"} sx={{ px: 0, py: { xs: 2, md: 3 } }}>
                        <Container maxWidth={'md'}>
                            <RideRouteSection ride={rideState} />
                        </Container>
                    </Box>
                </Box>
            </TabContext>
        </MapsApiLoader>
    </UserLayout >);
}

export default RideDetailsPage;