
import { Container } from "@mui/material";
import VehicleForm from "Components/Forms/VehicleForm";
import UserLayout from "Layout/User";

function VerifyVehiclePage({
    viewMode = false
}) {
    return (<UserLayout>
        <Container sx={{ pb: 6, pt: {xs: 2, md: 0} }}>
            <VehicleForm viewMode={viewMode} />
        </Container>
    </UserLayout>);
}

export default VerifyVehiclePage;