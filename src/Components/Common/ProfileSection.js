
import { Cancel, CloudUpload, Edit, Flip, PendingActions, QuestionMark, Save, Verified } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useApi from "Components/Hooks/useApi";
import { CITY_OPTIONS, GENDER_OPTIONS, ROUTE_WALLET, STATE_OPTIONS, VERIFICATION_STATUS } from "Store/constants";
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { formatMobileNumber, showError, showSuccess, unformatMobileNumber } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfilePictureModal from "./EditProfilePictureModal";
import PhotoFlipCard from "./PhotoFlipCard";


function ProfileSection() {
    const user = useSelector(selectUser);
    const defaultCardImage = { front: user.drivingLicenseFront, back: user.drivingLicenseBack };

    const [localUser, setLocalUser] = useState(user);
    const { loading, updateUserDetails, updateDrivingLicense } = useApi();
    const [isFlipped, setIsFlipped] = useState(false);
    const dispatch = useDispatch();
    const [isLicenseEditing, setIsLicenseEditing] = useState(false);
    const [cardImage, setCardImage] = useState(defaultCardImage);

    const toggleFlip = () => setIsFlipped(!isFlipped);
    const getVerificationStatus = () => {
        let Icon, text;
        switch (user.riderVerificationStatus) {
            case VERIFICATION_STATUS.VERIFIED:
                Icon = <Verified color="success" />
                text = "Verified";
                break;

            case VERIFICATION_STATUS.PENDING:
                Icon = <PendingActions color="warning" />
                text = "Verification pending"
                break;

            case VERIFICATION_STATUS.NOT_VERIFIED:
                Icon = <Cancel color="error" />
                text = "Rejected. Please Reupload";
                break;

            default:
                Icon = <QuestionMark color="primary" />
                text = "";
                break;
        }
        return <Stack direction={'row'} alignItems={'center'} spacing={1} justifyContent={"center"}>
            {Icon}
            <Typography variant="subtitle1">{text}</Typography>
        </Stack>
    }

    // ############################################# HANDLERS #############################################

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

    const handleLicenseEdit = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = handleFileInputChange;
        input.click();
    }

    const handleFileReset = () => {
        setIsLicenseEditing(false);
        if (isFlipped) {
            setCardImage({ ...cardImage, back: defaultCardImage.back, file: undefined });
        } else {
            setCardImage({ ...cardImage, front: defaultCardImage.front, file: undefined });
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setIsLicenseEditing(false);
            handleFileReset();
            return;
        }

        // URL.createObjectURL(file);
        if (!file.type.includes("png") && !file.type.includes("jpg") && !file.type.includes("jpeg")) {
            showError({ message: "Please upload only jpg or png file" });
            handleFileReset();
            setIsLicenseEditing(false);
            return;
        }

        const newLicense = URL.createObjectURL(file);
        setCardImage({
            ...cardImage,
            [isFlipped ? 'back' : 'front']: newLicense,
            file,
        })
        setIsLicenseEditing(true);
    }

    const handleLicenseUpload = () => {
        if (!cardImage.file) return;

        const payload = {
            [!isFlipped ? 'drivingLicenseFront' : 'drivingLicenseBack']: cardImage.file
        }
        updateDrivingLicense(payload).then(ack => {
            showSuccess({ message: ack.message });
        }).catch(err => {
            showError({ message: err.message });
        }).finally(handleFileReset)
    }

    useEffect(() => {
        setCardImage(defaultCardImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    return (
        <form onSubmit={handleUpdateUser}>
            <Stack spacing={4}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
                            <Box flexGrow={1}>
                                <Stack width={'fit-content'} justifyContent='start'>
                                    <Typography px={1} variant="h3" color={'primary'}>{user.firstName} {user.lastName}</Typography>
                                    <Button variant="text" LinkComponent={Link} to={ROUTE_WALLET} sx={{ width: 'fit-content' }}>
                                        <Typography color={'primary'} variant="h5">{`₹${user.balance}`}</Typography>
                                    </Button>
                                </Stack>
                            </Box>
                            <Stack>
                                {/* <AvatarSection /> */}
                                <EditProfilePictureModal />
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
                {user.riderVerificationStatus && <>
                    <Card>
                        <CardHeader title={<Stack direction={'row'} justifyContent={'space-between'}>
                            <Box>Driving License</Box>
                            {getVerificationStatus()}
                        </Stack>} />
                        <CardContent>
                            <PhotoFlipCard front={cardImage.front} back={cardImage.back} isFlipped={isFlipped} />
                            <Box display="flex" justifyContent="space-between">
                                <Button endIcon={<Flip />} onClick={toggleFlip} disabled={isLicenseEditing}>Flip</Button>
                                {!isLicenseEditing ?
                                    <Button startIcon={<Edit />} onClick={handleLicenseEdit}>Edit {isFlipped ? 'Back' : 'Front'}</Button>
                                    : <Stack direction='row' spacing={2}>
                                        <Button
                                            color="error"
                                            startIcon={<Cancel />}
                                            variant="outlined"
                                            sx={{ ml: 'auto !important' }}
                                            onClick={handleFileReset}
                                        >
                                            Cancel
                                        </Button>
                                        <LoadingButton
                                            loading={loading}
                                            variant="contained"
                                            onClick={handleLicenseUpload}
                                            startIcon={<CloudUpload />}
                                        >
                                            Upload
                                        </LoadingButton>
                                    </Stack>}

                            </Box>
                        </CardContent>
                    </Card>
                </>}

            </Stack>
        </form>
    );
}

export default ProfileSection;