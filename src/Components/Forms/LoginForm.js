import { useTheme } from "@emotion/react";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, CardActions, CardContent, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { ROUTE_REGISTER } from "Store/constants";
import { isEmptyString } from "Utils";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
    const theme = useTheme();
    const { loginUser, forgotPassword,loading } = useApi();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [credentialError, setCredentialError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const getInputType = (inputValue) => {
        // Regular expressions for email and mobile number validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;

        if (emailRegex.test(inputValue)) {
            return "email";
        }
        if (mobileRegex.test(inputValue)) {
            return "mobileNumber";
        }
        return "";
    };

    const handleSubmit = () => {
        var isValid = true;
        const inputType = getInputType(credential);

        const payload = {
            type: inputType,
            value: credential,
            password: password,
        };

        // Credential Type check
        if (isEmptyString(inputType)) {
            setCredentialError('Please enter a valid mobile number or email');
            isValid = false;
        }

        // Password check
        if (isEmptyString(password)) {
            setPasswordError('Please enter a password');
            isValid = false;
        }

        if (!isValid) return;

        // Submit to Backend API
        loginUser(payload);
    };

    const handleForgotPassword = ()=>{
        var isValid = true;
        const inputType = getInputType(credential);

        // Credential Type check
        if (isEmptyString(inputType)) {
            setCredentialError('Please enter a valid mobile number or email');
            isValid = false;
        }

        if(!isValid) return;

        const payload = {
            type: inputType,
            value: credential,
        };
        forgotPassword(payload)
    }

    return (
        <>
            <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} maxWidth={'500px'} mx={'auto'}>
                {/* <CardHeader
                    // title={<Typography variant="h3" textAlign={'center'}>Login</Typography>}
                    title={<>

                    </>}
                />
                 */}
                <CardContent>
                    <Box maxWidth={'sm'} mx={'auto'}>
                        <Stack spacing={3}>
                            <TextField
                                label="Email or Mobile Number"
                                fullWidth
                                value={credential}
                                variant="standard"
                                onChange={e => { setCredentialError(''); setCredential(e.target.value) }}
                                required
                                error={!isEmptyString(credentialError)}
                                helperText={credentialError}
                            />
                            <Stack spacing={1} alignItems={'end'}>
                                <TextField
                                    label="Password"
                                    variant='standard'
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password}
                                    onChange={e => { setPasswordError(''); setPassword(e.target.value) }}
                                    error={!isEmptyString(passwordError)}
                                    helperText={passwordError}
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
                                <Button sx={{ width: 'fit-content' }} color="secondary" onClick={handleForgotPassword}>
                                    <Typography>
                                        Forgot Password?
                                    </Typography>
                                </Button>
                            </Stack>
                            <LoadingButton
                                onClick={handleSubmit}
                                loading={loading}
                                startIcon={<Login />}
                                // sx={{ maxWidth: '16rem', mx: 'auto' }}
                                fullWidth
                                variant="contained">
                                Login
                            </LoadingButton>
                        </Stack>
                    </Box>
                </CardContent>
                <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                    <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                        <Typography>Don't have an account?</Typography>
                        <Typography color={theme.palette.text.primary} component={Link} to={ROUTE_REGISTER}>Sign up</Typography>
                    </Stack>
                </CardActions>
            </Box>
        </>
    );
}

export default LoginForm;