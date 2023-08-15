
import { AddCircle, Edit, PendingActions, Save, Verified } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GENDER_OPTIONS } from "Store/constants";
import { showSuccess } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { useSelector } from "react-redux";

function ProfileSection() {
    const user = useSelector((state) => state.auth.USER);
    const [loading, setLoading] = useState(false);

    const handleUpdateUser = ()=>{
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showSuccess({message:'User updated successfully!'});
        }, 1000);
    }
    return (
        <>
            <Stack spacing={4}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} width={'100%'} alignItems={'center'}>
                            <Stack flexGrow={1}>
                                <Avatar sx={{ width: '100px', height: '100px' }}>
                                    {user.firstName[0]}
                                </Avatar>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader title={'Personal Details'} />
                    <CardContent>
                        <>
                            <Grid container width={'100%'} rowSpacing={3} columnSpacing={{ xs: 0, md: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label='First Name'
                                        value={user.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label='Last Name'
                                        value={user.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="gender"
                                        // error={!isEmptyString(genderError)}
                                        >Gender</InputLabel>
                                        <Select
                                            labelId="gender"
                                            label="Gender"
                                            value={user.gender}
                                        // onChange={(e) => {
                                        //     setGenderError('');
                                        //     setGender(e.target.value)
                                        // }}
                                        // error={!isEmptyString(genderError)}
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
                                        // error={!isEmptyString(genderError)}
                                        >
                                            {/* {genderError} */}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                                        <DatePicker
                                            sx={{ width: "100%" }}
                                            label={"Date of Birth"}
                                            maxDate={new Date()}
                                            openTo="day"
                                            views={["year", "month", "day"]}
                                            format='dd/MM/yyyy'
                                            value={new Date(user.dateOfBirth)}
                                            // onChange={value => {
                                            //     setDobError('');
                                            //     setDateOfBirth(value);
                                            // }}
                                            slotProps={{
                                                textField: {
                                                    // error: !isEmptyString(dobError),
                                                    // helperText: dobError,
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    required: true,
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <MuiTelInput
                                        label="Phone Number"
                                        defaultCountry="IN"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Email Address"
                                        variant='outlined'
                                        type='email'
                                        fullWidth
                                        value={user.email}
                                        // onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                        // error={!isEmptyString(emailError)}
                                        // helperText={emailError}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="City"
                                        variant='outlined'
                                        type='email'
                                        fullWidth
                                    // value={user.email}
                                    // onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                    // error={!isEmptyString(emailError)}
                                    // helperText={emailError}
                                    // required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="State"
                                        variant='outlined'
                                        fullWidth
                                    // value={user.email}
                                    // onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                    // error={!isEmptyString(emailError)}
                                    // helperText={emailError}
                                    // required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Zip/Postal Code"
                                        variant='outlined'
                                        fullWidth
                                    // value={user.email}
                                    // onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                    // error={!isEmptyString(emailError)}
                                    // helperText={emailError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Address"
                                        variant='outlined'
                                        fullWidth
                                        multiline
                                        rows={4}
                                    // value={user.email}
                                    // onChange={e => { setEmailError(''); setEmail(e.target.value) }}
                                    // error={!isEmptyString(emailError)}
                                    // helperText={emailError}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    </CardContent>
                    <CardActions sx={{p: 2}}>
                        <LoadingButton
                            sx={{ml:'auto'}}
                            variant="contained"
                            startIcon={<Save />}
                            loading={loading}
                            onClick={handleUpdateUser}
                        >Save Changes</LoadingButton>
                    </CardActions>
                </Card>

                <Card>
                    <CardHeader title={'Vehicles'} />
                    <CardContent>
                        <Box>
                            <Stack spacing={4} maxWidth={'400px'} mx={'auto'}>
                                <Stack spacing={1}>
                                    <Button size="large" fullWidth startIcon={<Verified />} endIcon={<Edit />}>
                                        <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                            Black TaTa sedan
                                        </Typography>
                                    </Button>
                                    <Button size="large" fullWidth startIcon={<PendingActions />} endIcon={<Edit />}>
                                        <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                            Gray Ignis
                                        </Typography>
                                    </Button>
                                </Stack>
                                <Button variant="contained" size="medium" sx={{ justifyContent: 'start', width: 'fit-content' }} startIcon={<AddCircle />}>Add Car</Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

            </Stack>
        </>
    );
}

export default ProfileSection;