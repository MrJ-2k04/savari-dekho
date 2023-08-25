import { useTheme } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import RegistrationStepper from "Components/Forms/RegistrationStepper";
import { APP_BAR_DESKTOP } from "Store/constants";
import MinimalLayout from "Layout/Minimal"

function RegisterPage() {
    const url = ``;

    return (
        <MinimalLayout>
            {/* <Container>
                <Box position={'absolute'} sx={{
                    backgroundImage: `url('${url}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }} />
            </Container> */}
            {/* <Box
                // height={`calc(100vh - ${APP_BAR_DESKTOP}px)`}
                height={`100vh`}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={'center'}
            >
            </Box> */}
            <RegistrationStepper />
        </MinimalLayout>
    );
}

export default RegisterPage;