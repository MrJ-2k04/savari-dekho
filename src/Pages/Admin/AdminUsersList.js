import { Container } from "@mui/material";
import UsersTable from "Components/Admin/UsersTable";
import AdminLayout from "Layout/Admin";

function AdminUsersList() {
    return (<AdminLayout>
        <Container>
            <UsersTable />
        </Container>
    </AdminLayout>);
}

export default AdminUsersList;