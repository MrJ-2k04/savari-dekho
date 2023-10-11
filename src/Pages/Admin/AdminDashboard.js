import { Button, Typography } from "@mui/material";
import AdminLayout from "Layout/Admin";

function Dashboard() {
    return (<AdminLayout>
        <Typography>Admin Dashboard</Typography>
        <Button color="secondary" variant="contained">Test Me</Button>
    </AdminLayout>);
}

export default Dashboard;