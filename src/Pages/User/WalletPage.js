import { ExpandMore, History } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, Grid, IconButton, Stack, Typography, styled } from "@mui/material";
import { ReactComponent as Illustration } from "Assets/SVGs/Faq.svg";
import EditAmountModal from "Components/Common/EditAmountModal";
import WalletHistoryModal from "Components/Common/WalletHistoryModal";
import UserLayout from "Layout/User";
import { WALLET_FAQS } from "Store/constants";
import { selectIsDarkMode, selectUser } from "Store/selectors";
import { showError, showSuccess } from "Utils";
import { useState } from "react";
import { useSelector } from "react-redux";


const WalletCard = styled(Card)(({ theme }) => {
    const isDark = useSelector(selectIsDarkMode);
    return ({
        background: isDark ? `linear-gradient(0deg, rgb(25 31 36), rgb(255 255 255 / 0%)),linear-gradient(315deg, rgb(38 45 52) 0%, rgb(55 62 70) 50%, rgb(38 45 52) 50%, rgb(38 45 52) 100%)`
            : `linear-gradient(0deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.5)), linear-gradient(315deg, rgb(255, 255, 255) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%)`,
    })
});


function WalletPage() {
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showHisory, setShowHisory] = useState(false);
    const [activeFaq, setActiveFaq] = useState(-1);
    const user = useSelector(selectUser);

    const handleAddFundsOpen = e => setShowAddFunds(true);
    const handleAddFundsClose = e => setShowAddFunds(false);

    const handleShowHistory = e => setShowHisory(true);
    const handleHideHistory = e => setShowHisory(false);

    const handleAddFundsSuccess = (amount) => {
        console.log(amount);
        handleAddFundsClose();
        showSuccess({ message: 'Funds Added Successfully' })
    }

    const handleAddFundsFailure = (e) => {
        handleAddFundsClose();
        showError({ message: 'Failed to add funds!' });
    }

    return (
        <UserLayout>
            <Container sx={{ my: 4 }}>
                <WalletCard>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'start'}>
                            <Box>
                                <Typography textTransform="none" variant="h5" color={"primary"}>Current Balance:</Typography>
                                <Typography variant="h1" color={"primary"}>{`₹${user.balance || 0}`}</Typography>
                            </Box>
                            <IconButton color='primary' onClick={handleShowHistory}>
                                <History />
                            </IconButton>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button sx={{ ml: "auto" }} variant="outlined">Withdraw Funds</Button>
                        <Button variant="contained" onClick={handleAddFundsOpen}>Add Funds</Button>
                    </CardActions>
                </WalletCard>

                <Box my={6} />

                <Grid container spacing={{ xs: 2, md: 6, lg: 10 }}>
                    <Grid item xs={12} md={5.5} justifyContent={'center'}>
                        <Box maxWidth={{ xs: "75%", md: 'sm' }} mx={'auto'}>
                            <Illustration height={'100%'} width={'100%'} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6.5} maxWidth={'sm'}>
                        <Stack spacing={2} maxWidth={'md'} mx={"auto"}>
                            {/* <Box>
                                <Typography color={"primary"} textAlign={"center"} variant="h3">Wallet FAQs</Typography>
                                <Divider />
                            </Box> */}
                            <Box>
                                {WALLET_FAQS.map((faq, index) => (
                                    <Accordion expanded={activeFaq === index} key={index} onChange={(e, exp) => setActiveFaq(exp ? index : -1)}>
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
                    </Grid>
                </Grid>
            </Container>

            <WalletHistoryModal
                open={showHisory}
                onClose={handleHideHistory}
            />

            <EditAmountModal
                onClose={handleAddFundsClose}
                onSuccess={handleAddFundsSuccess}
                onCancel={handleAddFundsFailure}
                open={showAddFunds}
                title="Add Funds"
            />
        </UserLayout>
    );
}


export default WalletPage;