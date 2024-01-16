import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import StatCard from "Components/Common/StatCard";
import AdminLayout from "Layout/Admin";
import { toolLinks } from "Layout/Admin/AdminSidebarConfig";
import { selectUser } from "Store/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const user = useSelector(selectUser);
    const nav = useNavigate();
    return (<AdminLayout>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} mb={1}>
                    <Stack direction="row" spacing={1} mb={1}>
                        <Typography variant="h4">Hi{"   "}</Typography>
                        <Typography variant="h4" color="secondary">
                            {user.firstName},
                        </Typography>
                        <Typography variant="h4">welcome</Typography>
                    </Stack>
                    <Typography sx={{ ml: 'auto' }} variant="h4" color={'text.secondary'}>Balance:
                        <Box component={'span'} color={'secondary.main'}> ₹</Box>{user.balance}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {toolLinks.map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <StatCard
                                    label={item.title}
                                    icon={item.icon}
                                    onClick={() => nav(item.path)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </AdminLayout>);
}

export default Dashboard;