

import { AddCircle, Edit, PendingActions, Verified } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function AccountSection() {
    const user = useSelector((state) => state.auth.USER)
    
    return (
        <>
            <Stack spacing={4}>
                {/* <Card>
                    <CardContent>
                        <Box display={'flex'} width={'100%'} alignItems={'center'}>
                            <Stack flexGrow={1}>
                                <Avatar sx={{ width: '100px', height: '100px' }}>
                                    {user.firstName[0]}
                                </Avatar>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card> */}

                <Card>
                    <CardHeader title={'Payment Methods'} />
                    <CardContent>
                        <Box>
                            <Stack spacing={4} maxWidth={'400px'} mx={'auto'}>
                                <Stack spacing={1}>
                                    <Button size="large" fullWidth startIcon={<Verified />} endIcon={<Edit />}>
                                        <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                            Black TaTa sedan
                                        </Typography>
                                    </Button>
                                    <Button size="large" fullWidth startIcon={<PendingActions />} endIcon={<Edit />}>
                                        <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                            Gray Ignis
                                        </Typography>
                                    </Button>
                                </Stack>
                                <Button variant="contained" size="medium" sx={{ justifyContent: 'start', width: 'fit-content' }} startIcon={<AddCircle />}>Add Car</Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

            </Stack>
        </>
    );
}

export default AccountSection;