import { Security } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import AvatarSection from "Components/Forms/AvatarSection";
import useApi from "Components/Hooks/useApi";
import { selectUser } from "Store/selectors";
import { isEmptyString, showError } from "Utils";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { useSelector } from "react-redux";

function RiderDocUploadForm() {
    const user = useSelector(selectUser);
    const { loading, uploadRiderDocs } = useApi();

    const [profilePicture, setProfilePicture] = useState(user ? user.profilePicture : null);
    const [dlFront, setDlFront] = useState(null)
    const [dlBack, setDlBack] = useState(null)

    const [dlFrontError, setDlFrontError] = useState("");
    const [dlBackError, setDlBackError] = useState("");

    const handleUploadDocs = () => {
        let isValid = true;
        if (!dlFront) {
            setDlFrontError('Driving License Front Image is required');
            isValid = false;
        }
        if (!dlBack) {
            setDlBackError('Driving License Back Image is required');
            isValid = false;
        }
        if (!isValid) return;

        const payload = {
            drivingLicenseFront: dlFront,
            drivingLicenseBack: dlBack,
        }

        if (typeof profilePicture === 'object') {
            payload.profilePicture = profilePicture;
        }

        uploadRiderDocs(payload).then(ack => {

        }).catch(err => {
            showError({ message: err.message });
        });

        // dispatch(authActions.setUser({ ...user, isRider: true, isRiderVerified: false }));
    }

    const handleDlFrontChange = (newFile) => {
        setDlFrontError('');
        if (!newFile) {
            setDlFront(null);
            return;
        }
        const error = validateFile(newFile);
        if (error) return showError({ message: error })
        setDlFront(newFile);
    }
    const handleDlBackChange = (newFile) => {
        setDlBackError('');
        if (!newFile) {
            setDlBack(null);
            return;
        }
        const error = validateFile(newFile);
        if (error) return showError({ message: error })
        setDlBack(newFile);
    }

    const handleAvatarChange = (file) => {
        setProfilePicture(file);
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

    return (
        <Stack spacing={6} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2" textAlign='center'>Become a Rider</Typography>
            <Box display='flex' gap={2} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'400px'}>
                <AvatarSection value={profilePicture} onChange={handleAvatarChange} />
                <Typography fontSize={'20px !important'} textAlign={'start'}>Make sure your face is clearly visible</Typography>
            </Box>
            <Box display={'flex'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
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

            </Box>


            <LoadingButton
                loading={loading}
                size="large"
                variant="contained"
                onClick={handleUploadDocs}
                startIcon={<Security />}
            >
                Proceed
            </LoadingButton>
        </Stack>
    );
}

export default RiderDocUploadForm;