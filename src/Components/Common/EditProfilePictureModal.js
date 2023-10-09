import { Add, Cancel, Close, CloudUpload, Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, IconButton, Modal, Tooltip } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { showError, showSuccess } from "Utils";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function EditProfilePictureModal() {

    const { loading, updateUserDetails } = useApi();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewProfileSet, setIsNewProfileSet] = useState(false);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const profileInputRef = useRef();
    const handleProfileInputClick = () => profileInputRef.current.click()

    const startEditing = () => setIsEditing(true);
    const stopEditing = () => {
        setIsNewProfileSet(false);
        setIsEditing(false);
        setProfilePicture(user.profilePicture);
    }

    const handleDelete = () => {
        const updatedUser = { ...user };
        updatedUser.profilePicture = "delete";

        updateUserDetails(updatedUser).then((ack) => {
            dispatch(authActions.setUser({ ...user, profilePicture: undefined }));
            showSuccess({ message: ack.message });
            setIsNewProfileSet(false);
            setProfilePicture(undefined);
        }).catch(err => {
            showError({ message: err.message });
        });
    }

    const handleUpload = () => {
        const file = profileInputRef.current.files[0];

        const newUser = { ...user };
        newUser.profilePicture = file;
        updateUserDetails(newUser).then(ack => {
            dispatch(authActions.setUser({ ...user, profilePicture: URL.createObjectURL(file) }));
            showSuccess({ message: ack.message })
            setIsNewProfileSet(false);
        }).catch(err => {
            showError({ message: err.message });
        })
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // URL.createObjectURL(file);
        if (!file.type.includes("png") && !file.type.includes("jpg") && !file.type.includes("jpeg")) {
            showError({ message: "Please upload only jpg or png file" });
            return;
        }

        const newProfileUrl = URL.createObjectURL(file);

        setProfilePicture(newProfileUrl);
        setIsNewProfileSet(true);
    }

    const handleFileInputReset = () => {
        setProfilePicture(user.profilePicture);
        setIsNewProfileSet(false);
        profileInputRef.current.value = "";
    }

    return (<>
        <IconButton onClick={startEditing}>
            <Avatar sx={{ width: '86px', height: '86px' }} src={user.profilePicture}>
                {user.firstName[0]}
            </Avatar>
        </IconButton>
        <Modal open={isEditing} onClose={stopEditing}>
            <Container>
                <Box height={"100vh"} display={"flex"} justifyContent={"center"} flexDirection={"column"} width={"100%"}>
                    <Card>
                        <CardHeader
                            title={"Profile Picture"}
                            action={<Tooltip><IconButton onClick={stopEditing}><Close /></IconButton></Tooltip>}
                        />
                        <CardContent>
                            {/* {loading ? <Box display="flex" justifyContent="center" alignItems="center" height='360px' width='100%'>
                                <CircularProgress />
                            </Box> : */}
                            <Avatar sx={{ width: '360px', height: '360px', mx: 'auto' }} src={profilePicture}>
                                {user.firstName[0]}
                            </Avatar>
                            {/* } */}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={profileInputRef}
                                onChange={handleFileInputChange}
                            />
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2 }}>
                            <Button onClick={handleDelete} startIcon={<Delete />} color="error" disabled={loading}>Delete</Button>
                            {!isNewProfileSet ?
                                <Button
                                    onClick={handleProfileInputClick}
                                    startIcon={user.profilePicture ? <Edit /> : <Add />}
                                    sx={{ ml: 'auto !important' }}>
                                    {user.profilePicture ? "Update Photo" : "Add Photo"}
                                </Button>
                                :
                                <>
                                    <Button
                                        color="error"
                                        startIcon={<Cancel />}
                                        variant="outlined"
                                        sx={{ ml: 'auto !important' }}
                                        onClick={handleFileInputReset}
                                    >
                                        Cancel
                                    </Button>
                                    <LoadingButton
                                        loading={loading}
                                        variant="contained"
                                        onClick={handleUpload}
                                        startIcon={<CloudUpload />}
                                    >
                                        Upload
                                    </LoadingButton>
                                </>
                            }
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </Modal>
    </>);
}

export default EditProfilePictureModal;