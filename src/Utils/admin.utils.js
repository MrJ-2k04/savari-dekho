import { Avatar, Box } from "@mui/material";


export const renderImage = (src, tableMeta) => {
    return <Avatar
        src={src}
        alt={tableMeta?.columnData?.label} 
        loading="lazy"
        variant="rounded"
        style={{ width: 40, height: 40 }}
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