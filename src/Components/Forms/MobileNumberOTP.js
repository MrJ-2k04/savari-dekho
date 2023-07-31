import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { SendToMobile } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { MuiTelInput } from 'mui-tel-input';


const COOLDOWN = 5; // seconds


function MobileNumberOTP({ maxWidth = "500px", placeholder = "Enter your mobile", label = "Mobile Number", onSuccess }) {

    const [mobileNumber, setMobileNumber] = useState();

    const [otp, setOtp] = useState('');
    const [otpSending, setOtpSending] = useState(false);
    const [canSendOtp, setCanSendOtp] = useState(true);
    const [cooldownSeconds, setCooldownSeconds] = useState(COOLDOWN); // Set the cooldown duration in seconds
    const [isOtpSent, setIsOtpSent] = useState(false);  // Checks once in lifetime of component

    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        let cooldownTimer;
        if (!canSendOtp && cooldownSeconds > 0) {
            cooldownTimer = setTimeout(() => {
                setCooldownSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (cooldownSeconds <= 0) {
            setCanSendOtp(true);
            setCooldownSeconds(COOLDOWN); // Reset cooldown time when it's finished
        }

        return () => clearTimeout(cooldownTimer);
    }, [canSendOtp, cooldownSeconds]);



    const handleOtpComplete = (value) => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            onSuccess();
        }, 1000);
        console.log('Completed:', value);
    };

    const sendOtp = () => {
        setOtpSending(true);
        setCanSendOtp(false);

        // On Successfully Sending OTP
        setTimeout(() => {
            setOtp('');
            setOtpSending(false);
            setIsOtpSent(true);
        }, 1000);
    };

    return (
        <Box display={"flex"} flexDirection={"column"} gap={2} maxWidth={maxWidth} mx={"auto"}>
            <Box display={'flex'} columnGap={2} alignItems={'center'}>
                <MuiTelInput
                    sx={{ display: 'flex', gap: 5, flexGrow: 1 }}
                    defaultCountry="IN"
                    value={mobileNumber}
                    onChange={(num) => setMobileNumber(num)}
                    placeholder={placeholder}
                    label={label}
                />
                <Box>
                    <LoadingButton
                        startIcon={<SendToMobile />}
                        loading={otpSending}
                        variant="contained"
                        color="primary"
                        onClick={sendOtp}
                        disabled={!canSendOtp}
                    >
                        {canSendOtp ?
                            isOtpSent ? `Resend OTP` : `Send OTP`
                            : `Resend OTP (${cooldownSeconds}s)`
                        }
                    </LoadingButton>
                </Box>
            </Box>
            {isOtpSent && <Box minWidth={"20rem"} display={"flex"} flexDirection={"column"} rowGap={2} alignItems={"start"}>
                <MuiOtpInput
                    value={otp}
                    onChange={newOtp => setOtp(newOtp)}
                    length={6}
                    onComplete={handleOtpComplete}
                />
                <LoadingButton loading={isVerifying} variant='outlined' onClick={e => handleOtpComplete(otp)}>
                    Validate OTP
                </LoadingButton>
            </Box>}
        </Box>
    );
}

export default MobileNumberOTP;
