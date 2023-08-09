import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import useFetch from "Components/Hooks/useFetch";
import { formatMobileNumber, isEmptyString } from "Utils";
import { useState } from "react";

function LoginForm() {
    const { loginUser, loading } = useFetch();

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
        loginUser(payload).then(user => {
            
        }).catch(err => console.log(err.message))
    };

    return (
        <Card>
            <CardHeader
                title={<Typography variant="h5" textAlign={'center'}>Login</Typography>}
            />
            <CardContent>
                <Box maxWidth={'sm'} mx={'auto'}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email or Mobile Number"
                            fullWidth
                            value={credential}
                            onChange={e => { setCredentialError(''); setCredential(e.target.value) }}
                            required
                            error={!isEmptyString(credentialError)}
                            helperText={credentialError}
                        />
                        <TextField
                            label="Password"
                            variant='outlined'
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
                        <Button sx={{ width: 'fit-content' }} color="secondary">
                            <Typography>
                                Forgot Password
                            </Typography>
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            sx={{ maxWidth: '16rem', mx: 'auto' }}
                            variant="contained">
                            Login
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
}

export default LoginForm;