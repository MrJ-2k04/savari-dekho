import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { SendToMobile } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { MuiTelInput } from 'mui-tel-input';
import { formatMobileNumber, isEmptyString } from 'Utils';
import useFetch from 'Components/Hooks/useFetch';


const COOLDOWN = 10; // seconds


function MobileNumberOTP({ maxWidth = "500px", placeholder = "Enter your mobile", label = "Mobile Number", onSuccess }) {

    const { validateOtp, generateOtp, loading: otpSending } = useFetch();
    const [mobileNumber, setMobileNumber] = useState('');
    const [formattedMobileNumber, setFormattedMobileNumber] = useState('');

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [canSendOtp, setCanSendOtp] = useState(true);
    const [cooldownSeconds, setCooldownSeconds] = useState(COOLDOWN); // Set the cooldown duration in seconds
    const [isOtpSent, setIsOtpSent] = useState(false);  // Checks once in lifetime of component

    const [mobileNumberError, setMobileNumberError] = useState('');
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

    useEffect(() => {
        setFormattedMobileNumber(formatMobileNumber(mobileNumber));
    }, [mobileNumber])


    const handleOtpComplete = (value) => {
        if (isEmptyString(value) && isOtpSent) {
            setOtpError('Please fill the OTP properly');
            return;
        }
        setIsVerifying(true);

        validateOtp(value).then(res => {
            setIsVerifying(false);
            onSuccess(formattedMobileNumber);
        }).catch(() => {
            setOtp('');
            setIsVerifying(false);
        });
    };

    const sendOtp = () => {

        if (isEmptyString(formattedMobileNumber)) {
            setMobileNumberError('Please enter a valid mobile number');
            return;
        }

        setMobileNumberError('');

        // setOtpSending(true);
        setCanSendOtp(false);

        generateOtp(formattedMobileNumber).then(() => {

            // On Successfully Sending OTP
            setOtp('');
            // setOtpSending(false);
            setIsOtpSent(true);
        }).catch(() => {
            setOtp('');
            // setOtpSending(false);
        });


    };

    return (
        <Box display={"flex"} flexDirection={"column"} gap={2} maxWidth={maxWidth} mx={"auto"}>
            <Box display={'flex'} columnGap={2} alignItems={'start'}>

                <MuiTelInput
                    sx={{ display: 'flex', flexGrow: 1 }}
                    defaultCountry="IN"
                    value={mobileNumber}
                    onChange={(num) => setMobileNumber(num)}
                    placeholder={placeholder}
                    label={label}
                    error={!isEmptyString(mobileNumberError)}
                    helperText={mobileNumberError}
                />
                <Box mt={{ xs: 0, sm: 1 }}>
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
                    onChange={newOtp => { setOtp(newOtp); setOtpError(''); }}
                    length={6}
                    onComplete={finalOtp => isVerifying ? '' : handleOtpComplete(finalOtp)}
                    TextFieldsProps={{
                        error: !isEmptyString(otpError),
                    }}
                />
                <LoadingButton loading={isVerifying} variant='outlined' onClick={e => handleOtpComplete(otp)}>
                    Validate OTP
                </LoadingButton>
            </Box>}
        </Box>
    );
}

export default MobileNumberOTP;
