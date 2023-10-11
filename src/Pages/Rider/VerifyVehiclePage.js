
import { Container } from "@mui/material";
import VehicleForm from "Components/Forms/VehicleForm";
import UserLayout from "Layout/User";

function VerifyVehiclePage({
    viewMode = false
}) {
    return (<UserLayout>
        <Container sx={{ my: 3 }}>
            <VehicleForm viewMode={viewMode} />
        </Container>
    </UserLayout>);
}

export default VerifyVehiclePage;