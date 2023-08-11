import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import RegistrationStepper from "Components/Forms/RegistrationStepper";
import Layout from "Layout";
import { APP_BAR_DESKTOP } from "Store/constants";

function RegisterPage() {
    const url = `https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80`;

    return (
        <>
            <Container>
                <Box position={'absolute'} sx={{
                    backgroundImage: `url('${url}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }} />
                <Box
                    // height={`calc(100vh - ${APP_BAR_DESKTOP}px)`}
                    height={`100vh`}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={'center'}
                >
                    <RegistrationStepper />
                </Box>
            </Container>
        </>
    );
}

export default RegisterPage;