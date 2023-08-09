import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import RegistrationStepper from "Components/Forms/RegistrationStepper";
import Layout from "Layout";
import { APP_BAR_DESKTOP } from "Store/constants";

function RegisterPage() {
    return (
        <>
            <Container>
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