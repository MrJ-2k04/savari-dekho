
import { useTheme } from '@emotion/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CardContent, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MHidden } from 'Components/@Material-Extend';
import ValidationText from 'Components/Common/ValidationText';
import useApi from 'Components/Hooks/useApi';
import { CITY_OPTIONS, GENDER_OPTIONS, ROUTE_LOGIN, STATE_OPTIONS } from 'Store/constants';
import { is18Plus, isEmptyString, isValidDateObject, isValidEmail } from 'Utils';
import inLocale from "date-fns/locale/en-IN";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AvatarSection from './AvatarSection';
import MobileNumberOTP from './MobileNumberOTP';

const steps = ['Mobile Verfication', 'Basic Details', 'Location Details', 'Create Password'];

export default function RegistrationForm() {
    const theme = useTheme();
    const { registerUser, loading: submitting } = useApi();
    const location = useLocation();

    // --------------------------- Form Fields ---------------------------

    const [mobileNumber, setMobileNumber] = useState('');
    // Basic Details
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    // Location Details
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    // Password
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Error States
    const [fnError, setFnError] = useState('');
    const [lnError, setLnError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        isMinLength: false,
        hasNumber: false,
        hasUppercase: false,
        hasSpecialChar: false,
        isSame: false,
    });

    // --------------------------- Other States ---------------------------
    const [activeStep, setActiveStep] = useState(0);


    // --------------------------- Form Actions ---------------------------


    const handleSubmit = () => {
        // Validations
        let isValid = true;

        if (firstName.trim().length < 2) {
            setFnError('Please enter a valid first name');
            isValid = false;
        }
        if (lastName.trim().length < 2) {
            setLnError('Please enter a valid last name');
            isValid = false;
        }
        if (isEmptyString(gender)) {
            setGenderError('Please select a valid gender');
            isValid = false;
        }
        if (isEmptyString(city)) {
            setCityError('Please select a city');
            isValid = false;
        }
        if (isEmptyString(state)) {
            setStateError('Please select a state');
            isValid = false;
        }
        if (isEmptyString(address)) {
            setAddressError('Please enter a valid address');
            isValid = false;
        }

        if (!isValidDateObject(dateOfBirth)) {
            setDobError('Please enter a valid birth date');
            isValid = false;
        } else if (!is18Plus(dateOfBirth)) {
            setDobError('You must be atleast 18 years old!');
            isValid = false;
        }


        const userObj = {
            mobileNumber,
            firstName,
            lastName,
            gender,
            email,
            dateOfBirth,
            city,
            state,
            address,
            // zipcode,
            profilePicture,
            password
        }

        if (!isEmptyString(zipcode)) {
            userObj.zipcode = zipcode;
        }

        if (!isValid) {
            console.log("Not Valid");
            return;
        }


        // Submit to Backend
        registerUser(userObj);
    };
    const validateStep = (stepIndex) => {
        let isValid = true;
        switch (stepIndex) {
            case 1:
                if (firstName.trim().length < 2) {
                    setFnError('Please enter a valid first name');
                    isValid = false;
                }
                if (lastName.trim().length < 2) {
                    setLnError('Please enter a valid last name');
                    isValid = false;
                }
                if (isEmptyString(gender)) {
                    setGenderError('Please select a valid gender');
                    isValid = false;
                }
                if (!isValidDateObject(dateOfBirth)) {
                    setDobError('Please enter a valid birth date');
                    isValid = false;
                } else if (!is18Plus(dateOfBirth)) {
                    setDobError('You must be atleast 18 years old!');
                    isValid = false;
                }
                if (!isValidEmail(email)) {
                    setEmailError('Please enter a valid email address');
                    isValid = false;
                }
                break;

            case 2:
                if (isEmptyString(state)) {
                    setStateError('Please select a state');
                    isValid = false;
                }
                if (isEmptyString(city)) {
                    setCityError('Please select a city');
                    isValid = false;
                }
                if (isEmptyString(address)) {
                    setAddressError('Please enter a proper address');
                    isValid = false;
                }
                break;

            default:
                break;
        }
        return isValid;
    }
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        setPasswordValidation({
            isMinLength: newPassword.length >= 8,
            hasNumber: /\d/.test(newPassword),
            hasUppercase: /[A-Z]/.test(newPassword),
            hasSpecialChar: /[!@#$%^&*_-]/.test(newPassword),
            isSame: !isEmptyString(newPassword) && newPassword === confirmPassword,
        });
    };
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        setPasswordValidation({
            ...passwordValidation,
            isSame: !isEmptyString(confirmPassword) && password === newConfirmPassword,
        });
    }


    // --------------------------- Step Handlers ---------------------------

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
            return;
        }
        if (!validateStep(activeStep)) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <MobileNumberOTP onSuccess={num => { setMobileNumber(num); handleNext(); }} />
                );
            case 1:
                return (<Box mx={"auto"} display={"flex"} maxWidth={"30rem"}>
                    <Grid container columnSpacing={2} rowSpacing={3}>

                        <Grid item xs={5}>
                            <AvatarSection size={100} value={profilePicture} onChange={setProfilePicture} buttonText={"Upload Profile"} />
                        </Grid>
                        <Grid item xs={7}>
                            <Box height={"100%"} display={"flex"} alignItems={"center"}>
                                <Typography variant='h5' color={"primary"} fontFamily={'cursive'}>Show others how goodlooking you are!</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant='fullWidth' />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="First Name"
                                fullWidth
                                value={firstName}
                                onChange={e => { setFnError(''); setFirstName(e.target.value) }}
                                required
                                error={!isEmptyString(fnError)}
                                helperText={fnError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                value={lastName}
                                onChange={e => { setLnError(''); setLastName(e.target.value) }}
                                required
                                error={!isEmptyString(lnError)}
                                helperText={lnError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="gender" error={!isEmptyString(genderError)}>Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    label="Gender"
                                    value={gender}
                                    onChange={(e) => {
                                        setGenderError('');
                                        setGender(e.target.value)
                                    }}
                                    error={!isEmptyString(genderError)}
                                >
                                    {GENDER_OPTIONS.map((gender, index) => {
                                        return (
                                            <MenuItem key={index} value={gender}>
                                                {gender}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText
                                    error={!isEmptyString(genderError)}
                                >
                                    {genderError}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                                <DatePicker
                                    sx={{ width: "100%" }}
                                    label={"Date of Birth"}
                                    maxDate={new Date()}
                                    openTo="day"
                                    views={["year", "month", "day"]}
                                    // name={ID_DATE_OF_BIRTH}
                                    format='dd/MM/yyyy'
                                    value={dateOfBirth}
                                    onChange={value => {
                                        setDobError('');
                                        setDateOfBirth(value);
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !isEmptyString(dobError),
                                            helperText: dobError,
                                            fullWidth: true,
                                            variant: 'outlined',
                                            required: true,
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email Address"
                                variant='outlined'
                                type='email'
                                fullWidth
                                value={email}
                                onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                error={!isEmptyString(emailError)}
                                helperText={emailError}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>);

            case 2:
                return (<Box mx={"auto"} display={"flex"} maxWidth={"30rem"}>
                    <Grid container columnSpacing={2} rowSpacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="state" error={!isEmptyString(stateError)}>State</InputLabel>
                                <Select
                                    labelId="state"
                                    label="State"
                                    value={state}
                                    onChange={(e) => {
                                        setStateError('');
                                        setState(e.target.value)
                                    }}
                                    error={!isEmptyString(stateError)}
                                >
                                    {STATE_OPTIONS.map((state, index) => {
                                        return (
                                            <MenuItem key={index} value={state}>
                                                {state}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText
                                    error={!isEmptyString(stateError)}
                                >
                                    {stateError}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required disabled={isEmptyString(state)}>
                                <InputLabel id="city" error={!isEmptyString(cityError)}>City</InputLabel>
                                <Select
                                    labelId="city"
                                    label="City"
                                    value={city}
                                    onChange={(e) => {
                                        setCityError('');
                                        setCity(e.target.value)
                                    }}
                                    error={!isEmptyString(cityError)}
                                // disabled={isEmptyString(state)}
                                >
                                    {CITY_OPTIONS[state] && CITY_OPTIONS[state].map((city, index) => {
                                        return (
                                            <MenuItem key={index} value={city}>
                                                {city}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText
                                    error={!isEmptyString(cityError)}
                                >
                                    {cityError}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                multiline
                                rows={4}
                                fullWidth
                                value={address}
                                onChange={e => { setAddressError(''); setAddress(e.target.value) }}
                                required
                                error={!isEmptyString(addressError)}
                                helperText={addressError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Zip code"
                                fullWidth
                                value={zipcode}
                                onChange={e => setZipcode(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>)

            case 3:
                return (<Box mx={"auto"} display={"flex"} maxWidth={"30rem"} flexDirection={"column"} rowGap={3}>
                    <Stack width={"100%"} spacing={2}>
                        {/* <Typography variant='h3'>Now let's create a Strong Password</Typography> */}
                        <TextField
                            label="Password"
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
                            label="Confirm Password"
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
                </Box>);

            default:
                return null;
        }
    };



    return (
        <Box sx={{ width: '100%' }} maxWidth={"600px"} mx={"auto"}>
            <>
                <CardContent>
                    <MHidden width='mdDown'>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </MHidden>
                    <MHidden width='mdUp'>
                        <Stack>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="body1" color="text.secondary">{steps[activeStep]}</Typography>
                                <Typography variant="body1" color="text.secondary">{`Step ${activeStep + 1} of ${steps.length}`}</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={Math.round(((activeStep + 1) * 100) / steps.length)}
                            />
                        </Stack>
                    </MHidden>

                    <Box py={4} overflow={"auto"}>
                        {renderStepContent(activeStep)}
                    </Box>

                    {activeStep === 0 &&
                        <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                            <Typography>Already have an account?</Typography>
                            <Typography color={theme.palette.text.primary} component={Link} to={ROUTE_LOGIN} state={location.state}>Sign in</Typography>
                        </Stack>
                    }

                    {activeStep === 1 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} variant='contained'>
                            {'Next'}
                        </Button>
                    </Box>}

                    {activeStep === 2 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} variant='contained'>
                            {'Next'}
                        </Button>
                    </Box>}

                    {activeStep === 3 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <LoadingButton loading={submitting} onClick={handleNext} variant='contained'
                            disabled={submitting || !Object.values(passwordValidation).every(bool => bool)}>
                            {"Let's Go!"}
                        </LoadingButton>
                    </Box>}

                    {/* <Button onClick={e => setActiveStep(prev => prev + 1)}>Next</Button> */}
                </CardContent>
            </>
        </Box>
    );
}
