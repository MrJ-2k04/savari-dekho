import { Box, Grid } from "@mui/material";
import MyGoogleMap from "Components/Other/MyGoogleMap";

function RideForm() {
    return (<Box position={'absolute'} height={'100%'} width={'100%'} display={'flex'}>
        {/* <Grid container>
            <Grid item xs={12} md={6} order={1}>Input</Grid>
            <Grid item xs={12} md={6}>
                Map */}
        <MyGoogleMap />
        {/* </Grid>
        </Grid> */}
    </Box>);
}

export default RideForm;