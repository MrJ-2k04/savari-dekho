
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileNumberOTP from './MobileNumberOTP';
import { useState } from 'react';
import { CardContent, CardHeader, Card, TextField, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import inLocale from "date-fns/locale/en-IN"
import { GENDER_OPTIONS } from 'Store/constants';

const steps = ['Mobile Verfication', 'Email Address', 'Basic Details'];

export default function RegistrationStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => step === 1;
    const isStepSkipped = (step) => skipped.has(step);


    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (activeStep === steps.length - 1) {

        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {
        console.log("update user obj in backend");
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    
                    <MobileNumberOTP onSuccess={handleNext} />
                );
            case 1:
                return (
                    <Box mx={"auto"} display={"flex"} maxWidth={"30rem"}>
                        <TextField label="Email Address" variant='outlined' type='email' fullWidth />
                    </Box>
                );
            case 2:
                return (<Box mx={"auto"} display={"flex"} maxWidth={"30rem"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" fullWidth />
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
                                    // value={DOB}
                                    onChange={value => {
                                        // setDateError('');
                                        // setDOB(value)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            // name={ID_DATE_OF_BIRTH}
                                            // error={!IsEmptyString(dateError)}
                                            // size={INPUT_SIZE}
                                            // helperText={dateError}
                                            fullWidth
                                            variant="filled" {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    // name={ID_GENDER}
                                    label="Gender"
                                // value={gender}
                                // onChange={(e) => {
                                //     setGenderError('');
                                //     setGender(e.target.value)
                                // }}
                                // error={!IsEmptyString(genderError)}
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
                                // error={!IsEmptyString(genderError)}
                                >
                                    {/* {genderError} */}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>);
            // Add more cases for additional steps
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }} maxWidth={"600px"} mx={"auto"}>
            <Card>
                <CardContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">(Optional)</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <Box py={4} overflow={"auto"}>
                        {renderStepContent(activeStep)}
                    </Box>


                    {activeStep === 1 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" variant='outlined' onClick={handleSkip} sx={{ mr: 1 }}>
                            {'Skip'}
                        </Button>
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
                        <Button onClick={handleSubmit} variant='contained'>
                            {'Finish'}
                        </Button>
                    </Box>}
                </CardContent>
            </Card>


        </Box>
    );
}
