import { Add, AddCircle, Edit, Pending, PendingActions, Verified } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tabs, Tab, Card, CardContent, Stack, Typography, Avatar, Button } from "@mui/material";
import { TimeClock } from "@mui/x-date-pickers";
import Layout from "Layout";
import { useState } from "react";
import { useSelector } from "react-redux";


function Profile() {
    const [activeTab, setActiveTab] = useState("1")
    const user = useSelector((state) => state.auth.USER)

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    return (
        <Layout>
            <Container maxWidth={'md'}>
                <TabContext value={activeTab}>
                    <Box >
                        <Tabs value={activeTab} onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label="About you" value={"1"} />
                            <Tab label="Account" value={"2"} />
                        </Tabs>
                    </Box>
                    <Box>
                        <TabPanel value={"1"}>
                            <Stack spacing={4}>
                                <Card>
                                    <CardContent>
                                        <Box display={'flex'} width={'100%'} alignItems={'center'}>
                                            <Stack flexGrow={1}>
                                                <Avatar sx={{ width: '100px', height: '100px' }}>
                                                    {user.firstName[0]}
                                                </Avatar>
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Box display={'flex'} width={'100%'} alignItems={'center'}>
                                            <Stack flexGrow={1}>
                                                <Typography>Vehicles</Typography>
                                                <Button  sx={{textAlign:"left",width:'100%'}} startIcon={<Verified/>} endIcon={<Edit/>}>Black TaTa sedan</Button>
                                                <Button  sx={{textAlign:"left",width:'100%'}} startIcon={<PendingActions/>} endIcon={<Edit/>}>Black TaTa sedan</Button>
                                                <Button  sx={{textAlign:"left",width:'100%'}}  endIcon={<AddCircle/>}>Add Car</Button>
                                                
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                </Card>

                            </Stack>
                        </TabPanel>

                        <TabPanel value={"2"}>
                            Tab 2
                        </TabPanel>
                    </Box>
                </TabContext>
            </Container>
        </Layout>
    );
}

export default Profile;