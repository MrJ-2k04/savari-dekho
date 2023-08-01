
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileNumberOTP from './MobileNumberOTP';
import { useState } from 'react';
import { CardContent, CardHeader, Card, TextField, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid, Divider, InputAdornment, IconButton } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import inLocale from "date-fns/locale/en-IN"
import { GENDER_OPTIONS } from 'Store/constants';
import { isEmptyString, isValidDateObject, is18Plus, jsonToFormData, parseFormData, isValidEmail } from 'Utils';
import AvatarSection from './AvatarSection';
import { LoadingButton } from '@mui/lab';
import { Close, Done, Visibility, VisibilityOff } from '@mui/icons-material';

const steps = ['Mobile Verfication', 'Basic Details', 'Create Password'];

function ValidationText({ children, isValid = false }) {
    return <Box display={"flex"} alignItems={'center'} justifyContent={'start'} width={'100%'} columnGap={1}>
        {isValid ? <Done color='success' /> : <Close color='error' />}
        <Typography color={'inherit'}>
            {children}
        </Typography>
    </Box>
}

export default function RegistrationStepper() {

    // --------------------------- Form Fields ---------------------------

    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
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
    const [passwordValidation, setPasswordValidation] = useState({
        isMinLength: false,
        hasNumber: false,
        hasUppercase: false,
        hasSpecialChar: false,
        isSame: false,
    });

    // --------------------------- Other States ---------------------------
    const [submitting, setSubmitting] = useState(false)
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
            profilePicture
        }

        if (!isValid) {
            console.log("Not Valid");
            return;
        }

        const payload = jsonToFormData(userObj);
        // Submit to Backend
        console.log("Submitted");

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
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
            hasSpecialChar: /[!@#$%^&*_\-]/.test(newPassword),
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
        console.log("next");
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
            <Card>
                <CardContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box py={4} overflow={"auto"}>
                        {renderStepContent(activeStep)}
                    </Box>


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
                        <LoadingButton loading={submitting} onClick={handleNext} variant='contained' disabled={submitting}>
                            {"Let's Go!"}
                        </LoadingButton>
                    </Box>}

                    <Button onClick={e => setActiveStep(prev => prev + 1)}>Next</Button>
                </CardContent>
            </Card>


        </Box>
    );
}
