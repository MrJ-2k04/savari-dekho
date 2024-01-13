import { ArrowBackIos, Cancel, Delete, PendingActions, QuestionMark, Save, Security, Verified } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useApi from "Components/Hooks/useApi";
import { BOOLEAN_OPTIONS, ROUTE_PROFILE_DASHBOARD, VEHICLE_COLOR_OPTIONS, VEHICLE_FUEL_TYPES, VEHICLE_MANUFACTURERS, VEHICLE_MODELS, VEHICLE_TYPE_OPTIONS, VERIFICATION_STATUS } from "Store/constants";
import { selectIsDarkMode } from "Store/selectors";
import { isEmptyString, showConfirmationDialog, showError, showSuccess } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function VehicleForm({ viewMode = false }) {

    const { state } = useLocation();
    const nav = useNavigate();
    const { id } = useParams();
    const docsInputBorderColor = useSelector(selectIsDarkMode) ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
    const { loading, createVehicle, getVehicleDetails, updateVehicleById, deleteVehicleById } = useApi();




    // ################################################ STATES ################################################

    // For ViewMode
    const [vehicleId, setVehicleId] = useState(id || null);
    const [verificationStatus, setVerificationStatus] = useState("");

    const [rcBook, setRcBook] = useState(null)
    const [insurance, setInsurance] = useState(null)
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleFuel, setVehicleFuel] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [totalSeats, setTotalSeats] = useState(5);
    const [hasAc, setHasAc] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    const [airBags, setAirBags] = useState('');  // Optional
    const [makeYear, setMakeYear] = useState(null);  // Optional


    // Error States
    const [rcBookError, setRcBookError] = useState("");
    const [insuranceError, setInsuranceError] = useState("");
    const [vehicleTypeError, setVehicleTypeError] = useState('');
    const [vehicleFuelError, setVehicleFuelError] = useState('');
    const [vehicleColorError, setVehicleColorError] = useState('');
    const [totalSeatsError, setTotalSeatsError] = useState('');
    const [hasAcError, setHasAcError] = useState('');
    const [plateNumberError, setPlateNumberError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [modelError, setModelError] = useState('');
    const [makeYearError, setMakeYearError] = useState(''); // Optional field error

    // ################################################ COMPUTED PROPERTIES ################################################

    const getStatusIcon = () => {
        if (!viewMode) return <></>
        switch (verificationStatus) {
            case VERIFICATION_STATUS.VERIFIED:
                return <Verified fontSize="large" color="success" />;

            case VERIFICATION_STATUS.NOT_VERIFIED:
                return <Cancel fontSize="large" color="error" />

            case VERIFICATION_STATUS.PENDING:
                return <PendingActions fontSize="large" color="warning" />;

            default:
                return <QuestionMark fontSize="large" color="primary" />;
        }
    }

    // ################################################ API HANDLERS ################################################

    const syncVehicle = () => {
        getVehicleDetails(id)
            .then(details => {
                setVehicleId(details._id);
                setVerificationStatus(details.verificationStatus);

                setRcBook(details.rcBook);
                setInsurance(details.insurance);
                setVehicleType(details.type);
                setVehicleFuel(details.fuelType);
                setVehicleColor(VEHICLE_COLOR_OPTIONS.findIndex(obj => obj.name === details?.color?.name));
                setTotalSeats(details.totalSeats);
                setHasAc(details.hasAc);
                setPlateNumber(details.plateNumber);
                setBrand(details.brand);
                setModel(details.model);
                setAirBags(details.airBags);
                if (details.manufactureYear) {
                    setMakeYear(new Date(String(details.manufactureYear)));
                }
            })
            .catch(err => showError({ message: err.message }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let payload = {};

        if (!rcBook) {
            setRcBookError('Please upload RC Book front page');
            isValid = false;
        } else {
            setRcBookError('');
        }

        if (!insurance) {
            setInsuranceError('Please upload vehicle insurance');
            isValid = false;
        }

        if (isEmptyString(vehicleType)) {
            setVehicleTypeError('Please select a vehicle type');
            isValid = false;
        }

        if (isEmptyString(vehicleFuel)) {
            setVehicleFuelError('Please select a vehicle fuel type');
            isValid = false;
        }

        if (isEmptyString(vehicleColor)) {
            setVehicleColorError('Please enter the vehicle color');
            isValid = false;
        }

        if (totalSeats <= 0) {
            setTotalSeatsError('Total seats must be greater than 0');
            isValid = false;
        } else if (totalSeats >= 100) {
            setTotalSeatsError('Total seats must be less than 100');
            isValid = false;
        }

        if (isEmptyString(hasAc)) {
            setHasAcError('Please specify if the vehicle has AC');
            isValid = false;
        }

        if (isEmptyString(plateNumber)) {
            setPlateNumberError('Please enter the vehicle plate number');
            isValid = false;
        }

        if (isEmptyString(brand)) {
            setBrandError('Please enter the vehicle brand');
            isValid = false;
        }

        if (isEmptyString(model)) {
            setModelError('Please enter the vehicle model');
            isValid = false;
        }

        if (makeYear) {
            const year = new Date(makeYear).getFullYear();
            if (year < 1900 || year > new Date().getFullYear()) {
                setMakeYearError('Please enter a valid manufacturing year');
                isValid = false;
            } else {
                payload.manufactureYear = year;
            }
        }
        if (airBags) {
            payload.airBags = airBags;
        }

        if (!isValid) return;

        payload = {
            ...payload,
            rcBook,
            insurance,
            type: vehicleType,
            fuelType: vehicleFuel,
            color: JSON.stringify(VEHICLE_COLOR_OPTIONS[vehicleColor]),
            totalSeats: totalSeats,
            hasAc,
            plateNumber,
            brand,
            model,
        };

        if (viewMode) {
            updateVehicleById(vehicleId, payload)
                .then(ack => {
                    showSuccess({ message: ack.message });
                    syncVehicle();
                }).catch(err => showError({ message: err.message }))
        } else {
            // ADD New Vehicle using API
            createVehicle(payload).then(ack => {
                if (!state) {
                    nav(ROUTE_PROFILE_DASHBOARD);
                }
            }).catch(err => showError({ message: err.message }));
        }
    }

    const handleDelete = async () => {
        const { isConfirmed } = await showConfirmationDialog({
            title: 'Delete Vehicle?',
            icon: 'warning',
            message: 'Are you sure you want to delete this vehicle?',
            confirmBtnText: 'Delete',
            cancelBtnText: 'Cancel',
        })
        if (!isConfirmed) return;
        deleteVehicleById(vehicleId).then(async (ack) => {
            await showSuccess({ message: ack.message || "Vehicle Deleted Successfully!" })
            nav(-1);
        }).catch(err => showError({ message: err.message }))
    }

    // ################################################ STATE HANDLERS ################################################

    const handlePlateNumberChange = e => {
        let newNumber = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        setPlateNumberError('');
        setPlateNumber(newNumber);
    }

    const handleSeatsChange = (e) => {
        setTotalSeatsError('');
        const seats = parseInt(e.target.value);
        if (!seats) {
            setTotalSeats('');
            return;
        }
        setTotalSeats(seats);
    }

    const handleAirBagsChange = (e) => {
        const bags = parseInt(e.target.value);
        if (!bags) {
            setAirBags('');
            return;
        } else if (bags > totalSeats) {
            setAirBags(totalSeats);
            return;
        } else if (bags < 0) {
            setAirBags(0);
            return;
        }
        setAirBags(bags);
    }

    const handleRcBookChange = (newFile) => {
        setRcBookError('');
        if (!newFile) {
            setRcBook(null);
            return;
        }
        const error = validateFile(newFile);
        if (error) return showError({ message: error })
        setRcBook(newFile);
    }

    const handleInsuranceChange = (newFile) => {
        setInsuranceError('');
        if (!newFile) {
            setInsurance(null);
            return;
        }
        const error = validateFile(newFile);
        if (error) return showError({ message: error })
        setInsurance(newFile);
    }

    const validateFile = (file, maxSizeInMb = 10) => {
        if (!file) return "File not found";

        // 10 MB Limit
        if (file.size > 1024 * 1024 * maxSizeInMb) {
            return `File size must be less than ${maxSizeInMb}MB`;
        }

        if (!file.type.includes("image/")) {
            return `Only Image files are allowed (.jpg, .png, .jpeg)`;
        }

        return null;
    }


    useEffect(() => {
        if (!viewMode) return;

        syncVehicle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<form onSubmit={handleSubmit} noValidate>
        <Stack spacing={6} justifyContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                {getStatusIcon()}
                <Typography variant="h2" width={{ xs: 'min-content', sm: 'fit-content' }} textAlign='center'>{!viewMode ? "Add a Vehicle" : model}</Typography>
            </Stack>

            <Box width={'100%'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box component={'fieldset'} p={2} borderRadius={'8px'} height={'fit-content'} borderColor={docsInputBorderColor}>
                            <Box component={'legend'} px={1} color={'text.secondary'}>RC Book {viewMode ? "" : "*"}</Box>
                            <Stack spacing={2} alignItems={'center'}>
                                {!viewMode && <MuiFileInput
                                    fullWidth
                                    placeholder="Choose file"
                                    error={!isEmptyString(rcBookError)}
                                    helperText={rcBookError}
                                    value={rcBook}
                                    onChange={handleRcBookChange}
                                    inputProps={{
                                        accept: 'image/*', // Specify accepted file types (e.g., images)
                                    }}
                                    InputProps={{
                                        disableUnderline: true, // This removes the underline (border) from the TextField
                                    }}
                                    variant="standard"
                                />}
                                {rcBook && <Box
                                    component={'img'}
                                    src={viewMode ? rcBook : URL.createObjectURL(rcBook)}
                                    alt="Insurance"
                                    height={'200px'}
                                />}
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component={'fieldset'} p={2} borderRadius={'8px'} height={'fit-content'} borderColor={docsInputBorderColor}>
                            <Box component={'legend'} px={1} color={'text.secondary'}>Insurance {viewMode ? "" : "*"}</Box>
                            <Stack spacing={2} alignItems={'center'}>
                                {!viewMode && <MuiFileInput
                                    fullWidth
                                    placeholder="Choose file"
                                    error={!isEmptyString(insuranceError)}
                                    helperText={insuranceError}
                                    value={insurance}
                                    onChange={handleInsuranceChange}
                                    inputProps={{
                                        accept: 'image/*', // Specify accepted file types (e.g., images)
                                    }}
                                    InputProps={{
                                        disableUnderline: true, // This removes the underline (border) from the TextField
                                    }}
                                    variant="standard"
                                />}
                                {insurance && <Box
                                    component={'img'}
                                    src={viewMode ? insurance : URL.createObjectURL(insurance)}
                                    alt="Insurance"
                                    height={'200px'}
                                />}
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="vehicleType" error={!isEmptyString(vehicleTypeError)}>Vehicle Type</InputLabel>
                            <Select
                                labelId="vehicleType"
                                label="Vehicle Type"
                                value={vehicleType}
                                onChange={(e) => {
                                    setVehicleTypeError('');
                                    setVehicleType(e.target.value)
                                }}
                                error={!isEmptyString(vehicleTypeError)}
                            >
                                {VEHICLE_TYPE_OPTIONS.map((type, index) =>
                                    <MenuItem key={index} value={type}>
                                        {type}
                                    </MenuItem>
                                )}
                            </Select>
                            <FormHelperText
                                error={!isEmptyString(vehicleTypeError)}
                            >
                                {vehicleTypeError}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="vehicleFuelType" error={!isEmptyString(vehicleFuelError)}>Vehicle Fuel Type</InputLabel>
                            <Select
                                labelId="vehicleFuelType"
                                label="Vehicle Fuel Type"
                                value={vehicleFuel}
                                onChange={(e) => {
                                    setVehicleFuelError('');
                                    setVehicleFuel(e.target.value)
                                }}
                                error={!isEmptyString(vehicleFuelError)}
                            >
                                {VEHICLE_FUEL_TYPES.map((fuelType, index) => (
                                    <MenuItem key={index} value={fuelType}>
                                        {fuelType}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                error={!isEmptyString(vehicleFuelError)}
                            >
                                {vehicleFuelError}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Autocomplete
                            disablePortal
                            options={VEHICLE_MANUFACTURERS}
                            fullWidth
                            value={brand}
                            onChange={(event, newValue) => { setModel(''); setBrand(newValue); setBrandError(''); }}
                            isOptionEqualToValue={(option, value) => option.toLowerCase().includes(value.toLowerCase())}
                            renderInput={(params) => <TextField {...params} label="Vehicle Brand" error={!isEmptyString(brandError)} helperText={brandError} required />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Autocomplete
                            disablePortal
                            options={VEHICLE_MODELS[brand] || []}
                            disabled={!VEHICLE_MANUFACTURERS.includes(brand)}
                            fullWidth
                            freeSolo
                            value={model}
                            onChange={(event, newValue) => { setModel(newValue); setModelError(''); }}
                            isOptionEqualToValue={(option, value) => option.toLowerCase().includes(value.toLowerCase())}
                            renderInput={(params) => <TextField {...params} label="Vehicle Model" error={!isEmptyString(modelError)} helperText={modelError} value={model} onChange={e => setModel(e.target.value)} required />}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl fullWidth required>
                            <InputLabel id="vehicleColor" error={!isEmptyString(vehicleColorError)}>Vehicle Color</InputLabel>
                            <Select
                                labelId="vehicleColor"
                                label="Vehicle Color"
                                value={vehicleColor}
                                onChange={(e) => {
                                    setVehicleColorError('');
                                    setVehicleColor(e.target.value)
                                }}
                                error={!isEmptyString(vehicleColorError)}
                            >
                                {VEHICLE_COLOR_OPTIONS.map(({ value, name }, index) => (
                                    <MenuItem key={index} value={index}>
                                        <Box display={'flex'} alignItems={'center'} columnGap={2}>
                                            <Box borderRadius={'50%'} bgcolor={value} height={'19px'} width={'19px'}></Box>
                                            {name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                error={!isEmptyString(vehicleColorError)}
                            >
                                {vehicleColorError}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                            <DatePicker
                                sx={{ width: "100%" }}
                                label={"Manufacture Year"}
                                maxDate={new Date()}
                                minDate={Date.parse('1900')}
                                openTo="year"
                                views={["year"]}
                                format='yyyy'
                                value={makeYear}
                                onChange={value => {
                                    setMakeYear(value);
                                    setMakeYearError('');
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined',
                                        error: !isEmptyString(makeYearError),
                                        helperText: makeYearError,
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="License Plate Number"
                            placeholder="For ex: GJ01TM4050"
                            fullWidth
                            value={plateNumber}
                            onChange={handlePlateNumberChange}
                            required
                            error={!isEmptyString(plateNumberError)}
                            helperText={plateNumberError}
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <TextField
                            value={totalSeats || ""}
                            onChange={handleSeatsChange}
                            label="Total Seats"
                            type="number"
                            error={!isEmptyString(totalSeatsError)}
                            helperText={totalSeatsError}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            value={airBags}
                            onChange={handleAirBagsChange}
                            label="Total Air Bags"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth required error={!isEmptyString(hasAcError)}>
                            <InputLabel id="hasAc">Does your vehicle have A/C ?</InputLabel>
                            <Select
                                labelId="hasAc"
                                label={`Does your vehicle have A/C ?`}
                                value={hasAc}
                                onChange={(e) => {
                                    setHasAcError('');
                                    setHasAc(e.target.value);
                                }}
                                required
                            >
                                {BOOLEAN_OPTIONS.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value === BOOLEAN_OPTIONS[0]}>
                                            {value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{hasAcError}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Stack direction={'row'} spacing={3} rowGap={3} width={'100%'} flexWrap={'wrap'} justifyContent={{ xs: 'space-between', md: 'end' }}>

                {viewMode &&
                    <>
                        <Button
                            startIcon={<Delete />}
                            size="large"
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                            sx={{ mr: 'auto', order: { xs: 3, sm: 0 }, width: { xs: '100%', sm: 'fit-content' } }}
                        >
                            Delete
                        </Button>
                        <Button
                            startIcon={<ArrowBackIos />}
                            size="large"
                            color="secondary"
                            variant="outlined"
                            onClick={e => nav(ROUTE_PROFILE_DASHBOARD)}
                            sx={{ ml: { xs: "0 !important", md: "24px !important" } }}
                        >
                            Go Back
                        </Button>
                    </>
                }

                <LoadingButton
                    loading={loading}
                    type="submit"
                    size="large"
                    variant="contained"
                    startIcon={!viewMode ? <Security /> : <Save />}
                    sx={{ mx: 'auto' }}
                >
                    {!viewMode ? "Proceed to Add" : "Save changes"}
                </LoadingButton>
            </Stack>
        </Stack>
    </form >);
}

export default VehicleForm;