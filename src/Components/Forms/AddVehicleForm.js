import { AddModerator, Login, Palette, Security } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormHelperText, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { VEHICLE_COLOR_OPTIONS, VEHICLE_FUEL_TYPES, VEHICLE_TYPE_OPTIONS } from "Store/constants";
import { isEmptyString } from "Utils";
import { useState } from "react";

function AddVehicleForm() {


    const [vehicleType, setVehicleType] = useState('');
    const [vehicleFuel, setVehicleFuel] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [totalSeats, setTotalSeats] = useState(5);

    // Error States
    const [vehicleTypeError, setVehicleTypeError] = useState('');
    const [vehicleFuelError, setVehicleFuelError] = useState('');
    const [vehicleColorError, setVehicleColorError] = useState('');
    const [totalSeatsError, setTotalSeatsError] = useState('');


    const handleSeatsChange = (e) => {
        const seats = parseInt(e.target.value);
        if (!seats) {
            setTotalSeats('');
            return;
        }
        setTotalSeats(seats);
    }

    return (<Box>
        <Stack spacing={6} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" textAlign='center'>Add a Vehicle</Typography>
            {/* <Box display='flex' gap={2} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'400px'}>
                <AvatarSection value={profilePicture} onChange={handleAvatarChange} />
                <Typography fontSize={'20px !important'} textAlign={'start'}>Make sure your face is clearly visible</Typography>
            </Box> */}
            {/* <Box display={'flex'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
                <Box component={'fieldset'} p={3} borderRadius={'8px'} height={'fit-content'}>
                    <Box component={'legend'} px={1}>Driving License Front</Box>
                    <Box display='flex' gap={2} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'400px'}>
                        <MuiFileInput
                            placeholder="Choose file"
                            error={!isEmptyString(dlFrontError)}
                            helperText={dlFrontError}
                            // placeholder="Driving License Front"
                            // label={dlFront ? "Driving License Front" : ""}
                            value={dlFront}
                            onChange={handleDlFrontChange}
                            inputProps={{
                                accept: 'image/*', // Specify accepted file types (e.g., images)
                            }}
                        />
                        {dlFront && <Box component={'img'} src={URL.createObjectURL(dlFront)} alt="" height={'200px'} />}
                    </Box>
                </Box>

                <Box component={'fieldset'} p={3} borderRadius={'8px'} height={'fit-content'}>
                    <Box component={'legend'} px={1}>Driving License Back</Box>
                    <Box display='flex' gap={2} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'400px'}>
                        <MuiFileInput
                            placeholder="Choose file"
                            error={!isEmptyString(dlBackError)}
                            helperText={dlBackError}
                            // placeholder="Driving License Back"
                            // label={dlBack ? "Driving License Back" : ""}
                            value={dlBack}
                            name="drivingLicenseBack"
                            onChange={handleDlBackChange}
                            inputProps={{
                                accept: 'image/*', // Specify accepted file types (e.g., images)
                            }}
                        />
                        {dlBack && <Box component={'img'} src={URL.createObjectURL(dlBack)} alt="" height={'200px'} />}
                    </Box>
                </Box>

            </Box> */}

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

            <TextField
                value={totalSeats}
                onChange={handleSeatsChange}
                label="Total Seats"
                type="number"
                fullWidth
                required
            />

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
                                <ListItemText>{name}</ListItemText>
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