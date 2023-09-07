
import { Container } from "@mui/material";
import AddVehicleForm from "Components/Forms/AddVehicleForm";
import UserLayout from "Layout/User";

function VerifyVehiclePage() {
    return (<UserLayout>
        <Container sx={{ my: 3 }}>
            <AddVehicleForm />
        </Container>
    </UserLayout>);
}

export default VerifyVehiclePage;