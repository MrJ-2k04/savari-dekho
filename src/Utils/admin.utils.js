import { CloudDone, Sync } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import ImageModal from "Components/Common/ImageModal";


export const TableTitle = ({ title, loading }) => {
    return <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant="h4" color={'primary'}>{title}</Typography>
        {loading ?
            <SynchronizingIcon />
            :
            <CloudDone color="disabled" />
        }
    </Stack>
}

export const renderImage = title => (src, tableMeta) => {
    return <ImageModal
        alt={tableMeta?.columnData?.label}
        src={src}
        title={title}
    />
}

export const renderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('IN');
}

export const renderColor = (color) => {
    if (!color) return;

    return <Box display={'flex'} alignItems={'center'} columnGap={2}>
        <Box
            borderRadius={'50%'}
            bgcolor={color.value}
            height={'19px'}
            width={'19px'}
            minWidth={'19px'}
        />
        {color.name}
    </Box>
}

export const SynchronizingIcon = ({ props }) =>
    <Sync
        color="disabled"
        sx={{
            animation: "spin 2s linear infinite",
            "@keyframes spin": {
                "0%": {
                    transform: "rotate(360deg)",
                },
                "100%": {
                    transform: "rotate(0deg)",
                },
            },
        }}
        {...props}
    />