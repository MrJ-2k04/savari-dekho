import { Close, Done } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function ValidationText({ children, isValid = false }) {
    return <Box display={"flex"} alignItems={'center'} justifyContent={'start'} width={'100%'} columnGap={1}>
        {isValid ? <Done color='success' /> : <Close color='error' />}
        <Typography color={'inherit'}>
            {children}
        </Typography>
    </Box>
}