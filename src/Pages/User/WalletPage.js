import { Close, CurrencyRupee, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Divider, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from "@mui/material";
import EditAmountModal from "Components/Common/EditAmountModal";
import Payment from "Components/Other/Payment";
import UserLayout from "Layout/User";
import { ADD_FUND_AMOUNTS, THEME, WALLET_FAQS } from "Store/constants";
import { showError, showSuccess } from "Utils";
import { useState } from "react";
import { useSelector } from "react-redux";



function WalletPage() {
    const themeMode = useSelector(state => state.ui.themeMode);
    const [showAddFunds, setShowAddFunds] = useState(false);

    const handleAddFundsOpen = e => setShowAddFunds(true);
    const handleAddFundsClose = e => setShowAddFunds(false);

    const handleAddFundsSuccess = e => {
        handleAddFundsClose();
        showSuccess({ message: 'Funds Added Successfully' })
    }
    
    const handleAddFundsFailure = e=>{
        handleAddFundsClose();
        showError({message:'Failed to add funds!'});
    }

    const cardStyle = {
        background: themeMode === THEME.LIGHT ? `linear-gradient(0deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.5)), linear-gradient(315deg, rgb(255, 255, 255) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%)`
            : `linear-gradient(0deg, rgb(25 31 36), rgb(255 255 255 / 0%)),linear-gradient(315deg, rgb(38 45 52) 0%, rgb(55 62 70) 50%, rgb(38 45 52) 50%, rgb(38 45 52) 100%)`,
    }

    return (
        <UserLayout>
            <Container sx={{ my: 4 }}>
                <Card sx={{ ...cardStyle }}>
                    <CardContent>
                        <Typography textTransform="none" variant="h5" color={"primary"}>Current Balance:</Typography>
                        <Typography variant="h1" color={"primary"}>₹250</Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button sx={{ ml: "auto" }} variant="outlined">Withdraw Funds</Button>
                        <Button variant="contained" onClick={handleAddFundsOpen}>Add Funds</Button>
                    </CardActions>
                </Card>
                <Box my={5} />
                <Stack spacing={2} maxWidth={'md'} mx={"auto"}>
                    <Box>
                        <Typography color={"primary"} textAlign={"center"} variant="h3">Wallet FAQs</Typography>
                        <Divider />
                    </Box>
                    <Box>
                        {WALLET_FAQS.map(faq => (
                            <Accordion key={faq.question}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography variant="subtitle1">{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{faq.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Stack>
            </Container>
            <EditAmountModal 
                onClose={handleAddFundsClose}
                onSubmit={handleAddFundsSuccess}
                onCancel={handleAddFundsFailure}
                open={showAddFunds}
                title="Add Funds"
            />
        </UserLayout>
    );
}


export default WalletPage;