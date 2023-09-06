import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Tabs } from "@mui/material";
import RideCard from "Components/Common/RideCard";
import UserLayout from "Layout/User";
import { useState } from "react";

const defBookedRides = [
    {
        from: 'Point A',
        to: 'Point B',
        waypoints: [],
        price: 1650,
        departureDatetime: new Date().toLocaleDateString(),
        emptySeats: 3
    },
    {
        from: 'Point A',
        to: 'Point B',
        waypoints: [],
        price: 1650,
        departureDatetime: new Date().toLocaleDateString(),
        emptySeats: 3
    },
    {
        from: 'Point A',
        to: 'Point B',
        waypoints: [],
        price: 1650,
        departureDatetime: new Date().toLocaleDateString(),
        emptySeats: 3
    },
]

function RidesHistoryPage() {

    const [activeTab, setActiveTab] = useState("1");
    const [publishedRides, setPublishedRides] = useState([]);
    const [bookedRides, setBookedRides] = useState([...defBookedRides]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    return (
        <UserLayout>
            <Container maxWidth={'md'}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0px 9px 6px -4px rgba(0,0,0,0.05)' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label="Your Booked Rides" value={"1"} />
                            <Tab label="Your Published Rides" value={"2"} />
                        </Tabs>
                    </Box>
                    <Box>
                        <TabPanel value={"1"}>
                            {bookedRides.map((ride, index) => (
                                <RideCard ride={ride} key={index} />
                            ))}
                        </TabPanel>
                        <TabPanel value={"2"}>

                        </TabPanel>
                    </Box>
                </TabContext>
            </Container>
        </UserLayout>
    );
}

export default RidesHistoryPage;