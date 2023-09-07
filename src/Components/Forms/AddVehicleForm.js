import { Security } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BOOLEAN_OPTIONS, VEHICLE_COLOR_OPTIONS, VEHICLE_FUEL_TYPES, VEHICLE_MANUFACTURERS, VEHICLE_MODELS, VEHICLE_TYPE_OPTIONS } from "Store/constants";
import { selectIsDarkMode } from "Store/selectors";
import { isEmptyString, showError } from "Utils";
import inLocale from "date-fns/locale/en-IN";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function AddVehicleForm() {

    const isDark = useSelector(selectIsDarkMode);
    const docsInputBorderColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';

    const [vehicleType, setVehicleType] = useState('');
    const [vehicleFuel, setVehicleFuel] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [totalSeats, setTotalSeats] = useState(5);
    const [hasAc, setHasAc] = useState('');
    const [airBags, setAirBags] = useState('');
    const [makeYear, setMakeYear] = useState(null);
    const [plateNumber, setPlateNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    const [rcBook, setDlFront] = useState(null)
    const [insurance, setInsurance] = useState(null)

    const [rcBookError, setRcBookError] = useState("");
    const [insuranceError, setInsuranceError] = useState("");

    // Error States
    const [vehicleTypeError, setVehicleTypeError] = useState('');
    const [vehicleFuelError, setVehicleFuelError] = useState('');
    const [vehicleColorError, setVehicleColorError] = useState('');
    const [totalSeatsError, setTotalSeatsError] = useState('');
    const [hasAcError, setHasAcError] = useState('');
    const [plateNumberError, setPlateNumberError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [modelError, setModelError] = useState('');

    const handlePlateNumberChange = e => {
        let newNumber = e.target.value.replace(' ', '').toUpperCase();
        setPlateNumberError('');
        setPlateNumber(newNumber);
    }

    const handleSeatsChange = (e) => {
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
            setDlFront(null);
            return;
        }
        const error = validateFile(newFile);
        if (error) return showError({ message: error })
        setDlFront(newFile);
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
        console.log(brand);

        return () => {

        }
    }, [brand])


    return (<Box>
        <Stack spacing={6} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" textAlign='center'>Add a Vehicle</Typography>

            <Box width={'100%'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box component={'fieldset'} p={2} borderRadius={'8px'} height={'fit-content'} borderColor={docsInputBorderColor}>
                            <Box component={'legend'} px={1} color={'text.secondary'}>RC Book *</Box>
                            <Stack spacing={2} alignItems={'center'}>
                                <MuiFileInput
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
                                />
                                {rcBook && <Box component={'img'} src={URL.createObjectURL(rcBook)} alt="" height={'200px'} />}
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component={'fieldset'} p={2} borderRadius={'8px'} height={'fit-content'} borderColor={docsInputBorderColor}>
                            <Box component={'legend'} px={1} color={'text.secondary'}>Insurance *</Box>
                            <Stack spacing={2} alignItems={'center'}>
                                <MuiFileInput
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
                                />
                                {insurance && <Box component={'img'} src={URL.createObjectURL(insurance)} alt="" height={'200px'} />}
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
                            onChange={(event, newValue) => { setModel(''); setBrand(newValue) }}
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
                            onChange={(event, newValue) => setModel(newValue)}
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
                                    <MenuItem key={index} value={name}>
                                        <Box display={'flex'} alignItems={'center'} columnGap={2}>
                                            {/* <ListItemIcon sx={{ my: 'auto', height: '100%' }}><Palette sx={{ color: value }} /></ListItemIcon> */}
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
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: 'outlined',
                                        required: true,
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
                        <FormControl fullWidth required>
                            <InputLabel id="hasAc">Does your vehicle have A/C ?</InputLabel>
                            <Select
                                labelId="hasAc"
                                label={`Does your vehicle have A/C ?`}
                                value={hasAc}
                                onChange={(e) => {
                                    setHasAcError('');
                                    setHasAc(e.target.value);
                                }}
                                error={!isEmptyString(hasAcError)}
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
                            <FormHelperText error={!isEmptyString(hasAcError)}>{hasAcError}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <LoadingButton
                // loading={loading}
                size="large"
                variant="contained"
                // onClick={handleUploadDocs}
                startIcon={<Security />}
            >
                Proceed to Add
            </LoadingButton>
        </Stack>
    </Box>);
}

export default AddVehicleForm;