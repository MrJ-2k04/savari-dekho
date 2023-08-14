import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import RegistrationStepper from "Components/Forms/RegistrationStepper";
import Layout from "Layout";
import { APP_BAR_DESKTOP } from "Store/constants";

function RegisterPage() {
    const url = ``;

    return (
        <>
            <Container>
                <Box position={'absolute'} sx={{
                    backgroundImage: `url('${url}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '',
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