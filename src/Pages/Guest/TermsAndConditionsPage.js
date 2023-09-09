import { Padding } from "@mui/icons-material";
import { Box, Container, Paper, Typography } from "@mui/material";
import MinimalLayout from "Layout/Minimal";

function TermsAndCondititionsPage() {
    return (<MinimalLayout>
        <Container>
            <Typography variant="h6" style={{display:'flex',marginTop:'20px',justifyContent:'center',alignItems:'flex-start'}} >Terms & Conditions</Typography> 
            <Box alignItems='flex-start'
                 justifyContent='center'
                 display='flex'
                 height='70vh'
            >
            <Paper elevation={3}
                    style={{Padding:'20px',
                            margin:'30px',
                            height:1000,
                            width:1000,
                            }}
            >
            <Typography>Hey There!!</Typography>
            </Paper>
            </Box>
        </Container>
    </MinimalLayout>);
}

export default TermsAndCondititionsPage;