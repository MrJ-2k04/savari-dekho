import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
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

function RidesHistory() {

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
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label="Your Booked Rides" value={"1"} />
                            <Tab label="Your Published Rides" value={"2"} />
                        </Tabs>
                    </Box>
                    <Box>
                        <TabPanel value={"1"}>
                            {bookedRides.map((ride,index)=>(
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

export default RidesHistory;