import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function RideCard({ ride }) {

    const cardStyle = {
        cursor: 'pointer',
        mb:1
    }

    return (
        <Card sx={{...cardStyle}}>
            <CardContent>
                <Box display={'flex'} width={'100%'} alignItems={'center'}>
                    <Stack flexGrow={1}>
                        <Typography>{ride.departureDatetime}</Typography>
                        <Typography>{ride.from}</Typography>
                        <Typography>{ride.to}</Typography>
                    </Stack>
                    <Typography variant="h3">₹{ride.price}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default RideCard;