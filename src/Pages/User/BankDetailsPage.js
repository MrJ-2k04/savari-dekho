import { Container } from "@mui/material";
import BankForm from "Components/Forms/BankForm";
import UserLayout from "Layout/User";

function BankDetailsPage({ viewMode = false }) {
    return (<UserLayout>
        <Container sx={{ my: 3 }}>
            <BankForm viewMode={viewMode} />
        </Container>
    </UserLayout>);
}

export default BankDetailsPage;