import { Close, Download } from "@mui/icons-material";
import {
    Avatar, Box, Button, Card, CardActions, CardContent,
    CardHeader,
    IconButton,
    Modal,
    Tooltip
} from "@mui/material";
import { useState } from "react";

const ImageModal = ({
    src,
    alt,
    title = "Image",
    imageComponent,
}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const handleDownload = () => {
        // Create a temporary anchor element
        const downloadLink = document.createElement("a");

        // Set the href attribute to the image source
        downloadLink.href = src;

        // Set the download attribute to specify the filename (you can customize this)
        downloadLink.setAttribute("download", `${title}.jpg`);
        downloadLink.setAttribute("target", "_blank");

        // Trigger a click event to start the download
        downloadLink.click();
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: 2000,
        bgcolor: "background.paper",
        boxShadow: 24,
        maxHeight: "100vh",
        p: { xs: 1, md: 2 },
        px: { md: 0 },
        py: { xs: 2 }
    };

    const cardContentStyle = {
        maxHeight: "calc(100vh - 140px)",
        overflow: "auto",
        p: 2
    };

    return (
        <>

            {imageComponent || (
                <Avatar
                    src={src}
                    alt={alt}
                    loading="lazy"
                    variant="rounded"
                    onClick={(src ? handleOpen : null)}
                    sx={{ width: 40, height: 40, cursor: src ? 'pointer' : 'auto' }}
                />
            )}
            <Modal open={open} aria-labelledby="avatar-image-modal" aria-describedby="avatar-image-modal">
                <Card sx={style}>
                    <CardHeader
                        title={title}
                        action={
                            <Tooltip title="Close">
                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    <CardContent sx={cardContentStyle}>
                        <Box component={'img'} src={src} alt={alt} mx={'auto'} style={{ objectFit: 'contain' }} />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "end", px: 2 }}>
                        <Button onClick={handleDownload} variant="contained" startIcon={<Download />}>
                            Download
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    );
};

export default ImageModal;
