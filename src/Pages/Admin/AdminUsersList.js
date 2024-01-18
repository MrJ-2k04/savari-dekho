import { Box } from "@mui/material";
import UsersTable from "Components/Admin/UsersTable";
import AdminLayout from "Layout/Admin";

function AdminUsersList() {
    return (<AdminLayout>
        <Box p={3}>
            <UsersTable />
        </Box>
    </AdminLayout>);
}

export default AdminUsersList;