import { Box, Container, Grid } from "@mui/material";
import LoginForm from "Components/Forms/LoginForm";
import Layout from "Layout";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { isNumeric } from "Utils";
import {ReactComponent as Illustration} from "Assets/SVGs/Booking.svg";
import { APP_BAR_DESKTOP } from "Store/constants";
// import registerIllustration from "Assets/images/register_illustration1.png";

function LoginPage() {
    return (
        <Layout>
            <Grid container height={`calc(100vh - ${APP_BAR_DESKTOP}px)`} overflow={"hidden"} justifyContent={'start'} alignContent={'center'} alignItems={{xs: 'start', md:'center'}}>
                <Grid item xs={12} sm={12} lg={8} height={'fit-content'}>
                    {/* <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={{xs: '300px', sm: '400px', md: '500px'}}> */}
                    <Box width={{xs: '100%', sm: '600px', md: '750px', lg: '100%'}} mx={'auto'} maxWidth={{lg: '1100px'}}>
                        <Illustration width={'100%'} />
                    </Box>
                    {/* </Box> */}
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default LoginPage;