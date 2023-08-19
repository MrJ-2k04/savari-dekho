import { Box, Container } from "@mui/material";
import ResetPasswordForm from "Components/Forms/ResetPasswordForm";

function ResetPasswordPage() {
    return (
        <Container maxWidth="sm" sx={{ height: '100vh' }}>
            <Box height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={'center'}
            >
                <ResetPasswordForm />
            </Box>
        </Container>
    );
}

export default ResetPasswordPage;