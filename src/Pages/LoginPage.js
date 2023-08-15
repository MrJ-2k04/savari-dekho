import { Box, Grid } from "@mui/material";
import { ReactComponent as Illustration } from "Assets/SVGs/Booking.svg";
import LoginForm from "Components/Forms/LoginForm";
// import { APP_BAR_DESKTOP } from "Store/constants";

function LoginPage() {
    return (
        <>
            <Grid container height={`100vh`} overflow={"hidden"} justifyContent={'start'} alignContent={'center'} alignItems={{ xs: 'start', md: 'center' }}>
                <Grid item xs={12} sm={12} lg={8} height={'fit-content'}>
                    <Box width={{ xs: '100%', sm: '600px', md: '750px', lg: '100%' }} mx={'auto'}>
                        <Illustration width={'100%'} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={4} px={4}>
                    <LoginForm />
                </Grid>
            </Grid>
        </>
    );
}

export default LoginPage;