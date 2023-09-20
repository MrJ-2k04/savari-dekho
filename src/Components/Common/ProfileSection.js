
import { AddCircle, ArrowForwardIos, Cancel, PendingActions, QuestionMark, Save, Verified } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useApi from "Components/Hooks/useApi";
import { CITY_OPTIONS, GENDER_OPTIONS, ROUTE_VEHICLE, ROUTE_VEHICLE_ADD, ROUTE_WALLET, STATE_OPTIONS } from "Store/constants";
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { formatMobileNumber, showError, showSuccess, unformatMobileNumber } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileSection() {
    const user = useSelector(selectUser);

    const [localUser, setLocalUser] = useState(user);
    const [vehicles, setVehicles] = useState([]);
    const { loading, updateUserDetails, getVehicles } = useApi();
    const dispatch = useDispatch();

    const handleFieldChange = field => (e, details) => {
        let value;
        switch (field) {
            case 'dateOfBirth':
                value = e;
                break;

            case 'mobileNumber':
                value = e;
                break;

            default:
                value = e.target.value;
                break;
        }

        setLocalUser({ ...localUser, [field]: value });
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();

        const updatedUser = localUser;

        // Mobile Number validation
        if (localUser.mobileNumber?.includes("+")) {
            if (!matchIsValidTel(localUser.mobileNumber)) {
                showError({ message: 'Please enter a valid mobile number' });
                return;
            }
            updatedUser.mobileNumber = formatMobileNumber(localUser.mobileNumber);
        }

        if (!updatedUser.mobileNumber) {
            showError({ message: 'Please enter a valid mobile number' });
            return;
        }

        updateUserDetails(updatedUser).then((ack) => {
            showSuccess({ message: ack.message })
            dispatch(authActions.setUser(updatedUser));
        }).catch(err => {
            showError({ message: err.message });
        });
    }

    const fetchVehicles = () => {
        getVehicles()
            .then(newVehicles => setVehicles(newVehicles))
            .catch(err => showError({ message: err.message }));
    }

    useEffect(() => {
        fetchVehicles();
    }, [])

    return (
        <form onSubmit={handleUpdateUser}>
            <Stack spacing={4}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
                            <Box flexGrow={1}>
                                <Stack width={'fit-content'} justifyContent='start'>
                                    <Typography p={1} variant="h3" color={'primary'}>{user.firstName} {user.lastName}</Typography>
                                    <Button variant="text" LinkComponent={Link} to={ROUTE_WALLET} sx={{width: 'fit-content'}}>
                                        <Typography color={'primary'} variant="h5">{`₹${user.balance}`}</Typography>
                                    </Button>
                                </Stack>
                            </Box>
                            <Stack>
                                {/* <AvatarSection /> */}
                                <Avatar sx={{ width: '86px', height: '86px' }} src={user.profilePicture}>
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
                                        name='firstName'
                                        fullWidth
                                        label='First Name'
                                        value={localUser.firstName}
                                        onChange={handleFieldChange('firstName')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name='lastName'
                                        fullWidth
                                        label='Last Name'
                                        value={localUser.lastName}
                                        onChange={handleFieldChange('lastName')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Gender</InputLabel>
                                        <Select
                                            name='gender'
                                            labelId="gender"
                                            label="Gender"
                                            value={localUser.gender}
                                            onChange={handleFieldChange('gender')}
                                        >
                                            {GENDER_OPTIONS.map((gender, index) => {
                                                return (
                                                    <MenuItem key={index} value={gender}>
                                                        {gender}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
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
                                            onChange={handleFieldChange('dateOfBirth')}
                                            slotProps={{
                                                textField: {
                                                    name: 'dateOfBirth',
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <MuiTelInput
                                        value={unformatMobileNumber(localUser.mobileNumber)}
                                        // value={`+1 123 45 67899`}
                                        onChange={handleFieldChange('mobileNumber')}
                                        name='mobileNumber'
                                        label="Phone Number"
                                        // defaultCountry="IN"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name='email'
                                        label="Email Address"
                                        variant='outlined'
                                        type='email'
                                        fullWidth
                                        value={localUser.email}
                                        onChange={handleFieldChange('email')}
                                    />
                                </Grid>


                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">State</InputLabel>
                                        <Select
                                            labelId="state"
                                            label="State"
                                            value={localUser.state}
                                            onChange={e => {
                                                setLocalUser({
                                                    ...localUser,
                                                    "city": '',
                                                    "state": e.target.value
                                                })
                                            }}
                                        >
                                            {STATE_OPTIONS.map((state, index) => {
                                                return (
                                                    <MenuItem key={index} value={state}>
                                                        {state}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        {/* <FormHelperText
                                            error={!isEmptyString(stateError)}
                                        >
                                            {stateError}
                                        </FormHelperText> */}
                                    </FormControl>

                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="city">City</InputLabel>
                                        <Select
                                            labelId="city"
                                            label="City"
                                            value={localUser.city}
                                            onChange={handleFieldChange('city')}
                                        // error={!isEmptyString(cityError)}
                                        // disabled={isEmptyString(state)}
                                        >
                                            {CITY_OPTIONS[localUser.state] && CITY_OPTIONS[localUser.state].map((city, index) => {
                                                return (
                                                    <MenuItem key={index} value={city}>
                                                        {city}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12} md={4}>
                                    <TextField
                                        name='zipcode'
                                        label="Zip/Postal Code"
                                        variant='outlined'
                                        fullWidth
                                        type="number"
                                        value={Number(localUser.zipcode)}
                                        onChange={handleFieldChange('zipcode')}
                                        inputProps={{
                                            min: 1,
                                            max: 999999,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name='address'
                                        label="Address"
                                        variant='outlined'
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={localUser.address}
                                        onChange={handleFieldChange('address')}
                                    // error={!isEmptyString(emailError)}
                                    // helperText={emailError}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <LoadingButton
                            sx={{ ml: 'auto' }}
                            variant="contained"
                            startIcon={<Save />}
                            loading={loading}
                            type="submit"
                        // onClick={handleUpdateUser}
                        >Save Changes</LoadingButton>
                    </CardActions>
                </Card>

                <Card>
                    <CardHeader title={'Vehicles'} />
                    <CardContent>
                        <Box>
                            <Stack spacing={1} maxWidth={'400px'} mx={'auto'}>
                                {vehicles.length > 0 ? <Stack spacing={1}>
                                    {vehicles.map((vehicle, i) => {
                                        let Icon;
                                        switch (vehicle.verificationStatus) {
                                            case 'verified':
                                                Icon = <Verified color="success" />;
                                                break;

                                            case 'not verified':
                                                Icon = <Cancel color="error" />
                                                break;

                                            case 'pending':
                                                Icon = <PendingActions color="warning" />;
                                                break;

                                            default:
                                                Icon = <QuestionMark color="primary" />;
                                                break;
                                        }

                                        return <Button
                                            key={i}
                                            size="large"
                                            fullWidth startIcon={Icon}
                                            endIcon={<ArrowForwardIos />}
                                            LinkComponent={Link}
                                            to={`${ROUTE_VEHICLE}/${vehicle._id}`}>
                                            <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                                {vehicle.model}
                                            </Typography>
                                        </Button>
                                    })}
                                </Stack> : <Typography variant="subtitle1" px={1}>No Vehicles Found!</Typography>}
                                <Button
                                    variant="text"
                                    // color="secondary"
                                    size="large"
                                    sx={{ justifyContent: 'start' }}
                                    startIcon={<AddCircle />}
                                    LinkComponent={Link}
                                    to={ROUTE_VEHICLE_ADD}
                                >
                                    Add Vehicle
                                </Button>

                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

            </Stack>
        </form>
    );
}

export default ProfileSection;