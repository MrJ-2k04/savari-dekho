import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { isEmptyString } from "Utils";
import { useState } from "react";

function LoginForm() {

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [credentialError, setCredentialError] = useState('');

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
                            onChange={e => setPassword(e.target.value)}
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
                        <Button sx={{ width: 'fit-content' }} color="secondary">
                            <Typography>

                                Forgot Password
                            </Typography>
                        </Button>
                        <Button
                            sx={{ maxWidth:'16rem', mx: 'auto' }}
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