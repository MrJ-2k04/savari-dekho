import { Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { isNumeric } from "Utils";

function LoginPage() {
    const [otp, setOtp] = useState('')

    const handleChange = (newValue) => {
        setOtp(newValue);
    }

    const handleComplete = (value) => {
        console.log("Completed:", value);
    }

    return (
        <>
            <Box maxWidth={"40rem"}>
                <MuiOtpInput
                    value={otp}
                    onChange={handleChange}
                    length={6}
                    onComplete={handleComplete}
                    validateChar={isNumeric}
                />
            </Box>
        </>
    );
}

export default LoginPage;