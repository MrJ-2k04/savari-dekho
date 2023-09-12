
import { Container } from "@mui/material";
import AddVehicleForm from "Components/Forms/AddVehicleForm";
import UserLayout from "Layout/User";

function VerifyVehiclePage({
    viewMode = false
}) {
    return (<UserLayout>
        {viewMode ? 'ViewMode' : 'Add Mode'}
        <Container sx={{ my: 3 }}>
            <AddVehicleForm />
        </Container>
    </UserLayout>);
}

export default VerifyVehiclePage;