import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import RiderRequests from "Components/Admin/RiderRequests";
import VehicleRequests from "Components/Admin/VehicleRequests";
import RideCard from "Components/Common/RideCard";
import AdminLayout from "Layout/Admin";
import { useState } from "react";

function AdminVerifyRequests() {

    const [activeTab, setActiveTab] = useState("1");
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (<AdminLayout>
        <>
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0px 9px 6px -4px rgba(0,0,0,0.05)' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons={'auto'} allowScrollButtonsMobile>
                        <Tab label="Rider Verification Requests" value={"1"} />
                        <Tab label="Vehicle Verification Requests" value={"2"} />
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel value={"1"}>
                        <RiderRequests />
                    </TabPanel>
                    <TabPanel value={"2"}>
                        <VehicleRequests />
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    </AdminLayout>);
}

export default AdminVerifyRequests;