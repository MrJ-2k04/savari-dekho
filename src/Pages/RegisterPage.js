import { Box, Container, Typography } from "@mui/material";
import RegistrationStepper from "Components/Forms/RegistrationStepper";
import Layout from "Layout";

function RegisterPage() {
    return ( 
        <Layout>
            <Container>
                <Box my={10}>
                    <RegistrationStepper />
                </Box>
            </Container>
        </Layout>
     );
}

export default RegisterPage;