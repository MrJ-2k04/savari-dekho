
import { Container } from "@mui/material";
import RiderDocUploadForm from "Components/Forms/RiderDocUploadForm";
import UserLayout from "Layout/User";

function VerifyRiderPage() {
    return (<UserLayout>
        <Container sx={{ my: 3 }}>
            <RiderDocUploadForm />
        </Container>
    </UserLayout >);
}

export default VerifyRiderPage;