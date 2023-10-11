import { showError } from "Utils";
import { Avatar, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

const AvatarSection = ({ value: avatar,
  onChange: setAvatar,
  buttonText = "Upload Avatar",
  buttonSx = {},
  size = 80,
  separateButton = false,
  maxFileSizeInMb = null,
}) => {

  const handleFileChange = (event) => {
    if (!event.target.value) {
      setAvatar(null);
      return;
    }

    const file = event.target.files[0];

    if (!isValidImageFile(file)) {
      return;
    }

    setAvatar(file);
  };

  const isValidImageFile = (file) => {
    if (!file.type.toString().includes("image")) {
      showError({
        title: 'Oops',
        message: 'This File type is not allowed, please try again',
      });
      return false;
    } else if (maxFileSizeInMb && file.size > maxFileSizeInMb * 1024) {
      showError({
        title: 'Oops',
        message: `The File Size must be less than ${maxFileSizeInMb}MB`,
      });
      return false;
    }

    return true;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {avatar ? (
        <label htmlFor={!separateButton && "avatar-upload"}>
          <Avatar
            src={typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar}
            alt="Avatar"
            sx={{
              width: size,
              height: size,
              cursor: separateButton ? '' : 'pointer'
            }}
          />
        </label>
      ) : (
        <label htmlFor={!separateButton && "avatar-upload"}>
          <Avatar
            sx={{
              width: size,
              height: size,
              cursor: separateButton ? '' : 'pointer'
            }}
          ><PersonAdd fontSize={'large'} /></Avatar>
        </label>
      )}
      <input
        accept="image/*"
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {separateButton && <label htmlFor="avatar-upload">
        <Button component="span" variant="outlined" color="primary" {...buttonSx}>
          {buttonText}
        </Button>
      </label>}
    </div>
  );
};

export default AvatarSection;
