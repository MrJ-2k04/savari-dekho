import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Tabs } from "@mui/material";
import AccountSection from "Components/Common/AccountSection";
import ProfileSection from "Components/Common/ProfileSection";
import UserLayout from "Layout/User";
import { useState } from "react";


function Profile() {
    const [activeTab, setActiveTab] = useState("1")

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <UserLayout>
            <Container maxWidth={'md'} sx={{ py: 5 }}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label="About you" value={"1"} />
                            <Tab label="Account" value={"2"} />
                        </Tabs>
                    </Box>
                    <Box>
                        <TabPanel value={"1"}>
                            <ProfileSection />
                        </TabPanel>

                        <TabPanel value={"2"}>
                            <AccountSection />
                        </TabPanel>
                    </Box>
                </TabContext>
            </Container>
        </UserLayout>
    );
}

export default Profile;