import { Box, Container, Grid } from "@mui/material";
import LoginForm from "Components/Forms/LoginForm";
import Layout from "Layout";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { isNumeric } from "Utils";
import {ReactComponent as Illustration} from "Assets/images/login.svg";

function LoginPage() {
    const [otp, setOtp] = useState('')

    const handleChange = (newValue) => {
        setOtp(newValue);
    }

    const handleComplete = (value) => {
        console.log("Completed:", value);
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} sm={7} md={8}>
                    <Illustration />
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default LoginPage;