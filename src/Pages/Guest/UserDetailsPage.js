import { useTheme } from "@emotion/react";
import { CloudUpload, Hail, LocalTaxi, Verified } from "@mui/icons-material";
import { Avatar, Box, Container, Divider, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { VERIFICATION_STATUS } from "Store/constants";
import { calculateAge } from "Utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetailsPage() {
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const { loading, getUserById } = useApi();

    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            setError("User ID not found!");
            return;
        };

        getUserById(userId)
            .then(user => setUser(user))
            .catch(err => setError(err.message))
    }, []);

    return (<UserLayout>
        <Container maxWidth={'md'} sx={{ py: 2 }}>

            {loading && <LinearProgress />}

            {!loading && user && <>
                <Stack spacing={2}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Avatar sx={{ height: '96px', width: '96px' }} src={user.profilePicture}>
                            {user.firstName[0]}
                        </Avatar>

                        <Stack justifyContent={'center'}>
                            <Typography variant="h3" color={'primary'}>{`${user.firstName} ${user.lastName}`}</Typography>
                            <Typography textAlign={'end'} variant="body1" fontSize={'larger !important'} color={'text.secondary'}>{calculateAge(user.dateOfBirth)} y/o</Typography>
                        </Stack>
                    </Box>
                    <Divider sx={{ borderRadius: '16px', py: 1 }} />
                    <List>
                        {user.email && <ListItem>
                            <ListItemIcon>
                                <Verified color="success" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h5" color={'text.secondary'} fontWeight={500}>Confirmed Email</Typography>
                            </ListItemText>
                        </ListItem>}
                        {user.mobileNumber && <ListItem>
                            <ListItemIcon>
                                <Verified color="success" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h5" color={'text.secondary'} fontWeight={500}>Confirmed Phone Number</Typography>
                            </ListItemText>
                        </ListItem>}
                        {user.riderVerificationStatus === VERIFICATION_STATUS.VERIFIED && <ListItem>
                            <ListItemIcon>
                                <Verified color="success" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h5" color={'text.secondary'} fontWeight={500}>Driving License Verified</Typography>
                            </ListItemText>
                        </ListItem>}
                    </List>
                    <Divider sx={{ borderWidth: '4px', borderRadius: '16px', }} />
                    <Typography px={1} variant="h4" color={'primary'}>{`About ${user.firstName} ${user.lastName}`}</Typography>
                    <Stack spacing={1}>
                        <ListItem>
                            <ListItemIcon>
                                <LocalTaxi color="warning" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h5" color={'text.secondary'} fontWeight={400}>
                                    Rides published
                                </Typography>
                            </ListItemText>
                            <ListItemIcon>
                                <Avatar sx={{ backgroundColor: `${theme.palette.primary.main} !important`, height: '36px', width: '36px', mx: 'auto' }}>
                                    {user.publishedRides}
                                </Avatar>
                            </ListItemIcon>
                        </ListItem>
                        <Divider variant="middle" flexItem />
                        <ListItem>
                            <ListItemIcon>
                                <Hail color="info" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h5" color={'text.secondary'} fontWeight={400}>
                                    Rides travelled
                                </Typography>
                            </ListItemText>
                            <ListItemIcon>
                                <Avatar sx={{ backgroundColor: `${theme.palette.primary.main} !important`, height: '36px', width: '36px', mx: 'auto' }}>
                                    {user.travelledRides}
                                </Avatar>
                            </ListItemIcon>
                        </ListItem>
                    </Stack>

                    <Divider sx={{ borderWidth: '4px', borderRadius: '16px' }} />
                    <Typography textAlign={'center'} color={'text.secondary'} variant="h4">Member since {format(new Date(user.createdAt), "MMMM, yyyy")}</Typography>
                </Stack>
            </>}

            {error && <Stack spacing={2}>
                <Typography variant="h3">Some error occured</Typography>
                <Typography variant="subtitle1">{error}</Typography>
            </Stack>}
        </Container>
    </UserLayout>);
}

export default UserDetailsPage;