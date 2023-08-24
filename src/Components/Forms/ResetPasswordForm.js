import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import ValidationText from "Components/Common/ValidationText";
import useFetch from "Components/Hooks/useFetch";
import { ROUTE_LOGIN } from "Store/constants";
import { isEmptyString, showError, showSuccess } from "Utils";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordForm() {
    const { userId } = useParams();
    const { resetPassword, loading } = useFetch();
    const nav = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValidation, setPasswordValidation] = useState({
        isMinLength: false,
        hasNumber: false,
        hasUppercase: false,
        hasSpecialChar: false,
        isSame: false,
    });

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        setPasswordValidation({
            isMinLength: newPassword.length >= 8,
            hasNumber: /\d/.test(newPassword),
            hasUppercase: /[A-Z]/.test(newPassword),
            hasSpecialChar: /[!@#$%^&*_\-]/.test(newPassword),
            isSame: !isEmptyString(newPassword) && newPassword === confirmPassword,
        });
    };
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        setPasswordValidation({
            ...passwordValidation,
            isSame: !isEmptyString(newConfirmPassword) && password === newConfirmPassword,
        });
    }

    const handleSubmit = () => {
        if (!userId) {
            showError({ title: 'Invalid User ID', message: "Can't reset password. User ID Not valid!" })
            return;
        }

        resetPassword(password, userId).then((ack)=>{
            showSuccess({ message: ack.message }).then(() => {
                nav(ROUTE_LOGIN);
            });
        }).catch(err=>{
            showError({ message: err.message });
        });
    }

    return (
        <>
            <Card>
                <CardHeader
                    title={<Typography variant="h5" textAlign={'center'}>Reset Your Password</Typography>}
                />
                <CardContent>
                    <Box mx={"auto"} display={"flex"} maxWidth={"30rem"} flexDirection={"column"} rowGap={3}>
                        <Stack width={"100%"} spacing={2}>
                            {/* <Typography variant='h3'>Now let's create a Strong Password</Typography> */}
                            <TextField
                                label="New Password"
                                variant='outlined'
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={password}
                                onChange={handlePasswordChange}
                                // error={!IsEmptyString(emailError)}
                                // helperText={emailError}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            onMouseDown={e => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Confirm New Password"
                                variant='outlined'
                                type={showConfirmPassword ? 'text' : 'password'}
                                fullWidth
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                // error={!IsEmptyString(emailError)}
                                // helperText={emailError}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword((show) => !show)}
                                            onMouseDown={e => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                        </Stack>
                        <Stack width={"100%"} spacing={1} alignItems={'start'} display={'flex'}>
                            <ValidationText isValid={passwordValidation.isMinLength}>Minimum 8 characters</ValidationText>
                            <ValidationText isValid={passwordValidation.hasNumber}>Atleast 1 number</ValidationText>
                            <ValidationText isValid={passwordValidation.hasUppercase}>Atleast 1 uppercase letter</ValidationText>
                            <ValidationText isValid={passwordValidation.hasSpecialChar}>Atleast 1 special character</ValidationText>
                            <ValidationText isValid={passwordValidation.isSame}>Matches with Confirm Password</ValidationText>
                        </Stack>
                    </Box>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                    <LoadingButton
                        loading={loading}
                        sx={{ ml: "auto" }}
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading || !Object.values(passwordValidation).every(bool => bool)}
                    >Confirm Reset Password</LoadingButton>
                </CardActions>
            </Card>
        </>
    );
}

export default ResetPasswordForm;