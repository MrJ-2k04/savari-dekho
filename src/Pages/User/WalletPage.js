import { ExpandMore, History } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, Grid, IconButton, Stack, Typography, styled } from "@mui/material";
import { ReactComponent as Illustration } from "Assets/SVGs/Faq.svg";
import EditAmountModal from "Components/Common/EditAmountModal";
import WalletHistoryModal from "Components/Common/WalletHistoryModal";
import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { ROUTE_BANK_ADD, ROUTE_WALLET, WALLET_FAQS } from "Store/constants";
import { selectIsDarkMode, selectUser } from "Store/selectors";
import { showError, showSelectDialog, showSuccess, showWarning } from "Utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WalletCard = styled(Card)(({ theme }) => {
    const isDark = useSelector(selectIsDarkMode);
    return ({
        background: isDark ?
            `linear-gradient(0deg, rgb(28 30 31), rgb(255 255 255 / 0%)),linear-gradient(315deg, rgb(80 84 89) 0%, rgb(64 67 70) 50%, rgb(47 50 52) 50%, rgb(31 30 30) 100%)`
            // `linear-gradient(0deg, rgb(25 31 36), rgb(255 255 255 / 0%)),linear-gradient(315deg, rgb(38 45 52) 0%, rgb(55 62 70) 50%, rgb(38 45 52) 50%, rgb(38 45 52) 100%)`
            : `linear-gradient(0deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.5)), linear-gradient(315deg, rgb(255, 255, 255) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%)`,
    })
});


function WalletPage() {
    const user = useSelector(selectUser);
    const { requestPayment, validatePayment, cancelPayment, requestWithdrawal, getBanks, loading, syncUser } = useApi();
    const nav = useNavigate();

    // ################################################ States ################################################

    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);
    const [showHisory, setShowHisory] = useState(false);
    const [activeFaq, setActiveFaq] = useState(-1);
    const [bank, setBank] = useState(null);

    const showAddFundsModal = () => setShowAddFunds(true);
    const hideAddFundsModal = () => setShowAddFunds(false);
    const showWithdrawFundsModal = () => setShowWithdrawFunds(true);
    const hideWithdrawFundsModal = () => setShowWithdrawFunds(false);
    const handleShowHistory = () => setShowHisory(true);
    const handleHideHistory = () => setShowHisory(false);

    // ########################################## Add Funds Handler ##########################################

    const handleAddFundsSuccess = (resp) => {
        // Send this response to the backend for verification
        const credentials = {
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature,
        }
        // console.log("Payment success", resp);
        validatePayment(credentials).then(msg => {
            hideAddFundsModal();
            showSuccess({ message: 'Funds Added Successfully' })
        }).catch(err => {
            console.error(err.message);
            handleAddFundsFailure(err.message);
        });
    }
    const handleAddFundsProceed = (amount) => {
        // Request through Razorpay API
        const description = "Add Funds to Wallet";
        requestPayment(amount, description).then(data => {
            const { order, key } = data;
            const options = {
                key,
                amount: order.amount,
                order_id: order.id,
                name: "Savari Dekho Ltd.",
                description,
                image: 'https://savari-dekho.pages.dev/static/media/logo.6e86b5270fbf4e6d5ed6f431ace6eb54.svg',
                prefill: {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    contact: user.mobileNumber.split("-")[1],
                },
                notes: {
                    userId: user._id
                },
                handler: handleAddFundsSuccess,
                "modal": {
                    "ondismiss": () => {
                        cancelPayment(order.id).then(msg => handleAddFundsFailure(msg)).catch(err => handleAddFundsFailure());
                    },
                },
                theme: {
                    color: '#27374D',
                }
            };
            const razorpay = new window.Razorpay(options);

            razorpay.open();
        }).catch(err => {
            console.error(err.message);
            handleAddFundsFailure(err.message);
        });
    }
    const handleAddFundsFailure = () => {
        hideAddFundsModal();
        showError({ message: 'Failed to add funds!' });
        setBank(null);
    }

    // ########################################## Add Funds Handler ##########################################

    // Step 1 - Obtain Bank ID
    const handleWithdrawFunds = () => {
        getBanks().then(banks => {
            if (banks.length === 0) {
                showWarning({
                    message: "You don't have any bank account added. Please add a bank account to proceed.",
                    otherOptions: {
                        allowOutsideClick: false,
                        showCloseButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Add bank",
                        preConfirm: () => {
                            nav(ROUTE_BANK_ADD, {
                                state: {
                                    redirectUrl: ROUTE_WALLET
                                }
                            });
                        }
                    }
                })
                return;
            }
            const bankOptions = banks.map(bank => `${bank.ifsc} - ${bank.accountNumber}`);
            showSelectDialog({
                title: "Select bank",
                message: "What bank would you like us to transfer funds to?",
                inputOptions: bankOptions,
                inputPlaceholder: "Select a bank account",
                confirmButtonText: "Proceed",
            }).then(result => {
                const bankIndex = parseInt(result.value);
                if (isNaN(bankIndex)) {
                    console.log("Unknown Error occured");
                    return "Unknown Error"
                };
                setBank(banks[bankIndex]);
                setTimeout(() => {
                    showWithdrawFundsModal();
                }, 250);
            })
        }).catch(err => showError({ message: err.message }));
    }

    // Step 2 - Obtain amount & request withdrawal
    const handleWithdrawFundsProceed = (amount) => {
        if (!bank?._id) return;
        requestWithdrawal(amount, bank._id).then(msg => {
            showSuccess({ message: msg });
            setBank(null);
            setShowWithdrawFunds(false);
            syncUser();
        }).catch(err => showError({ message: err.message }));
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
                        <LoadingButton loading={showWithdrawFunds && loading} sx={{ ml: "auto" }} onClick={handleWithdrawFunds} variant="outlined">Withdraw Funds</LoadingButton>
                        <Button variant="contained" onClick={showAddFundsModal}>Add Funds</Button>
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
                                            <Typography variant="subtitle1" color={'secondary'} mr={1}>Q:</Typography>
                                            <Typography variant="subtitle1" color={'primary'}>{faq.question}</Typography>
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

            {showHisory && <WalletHistoryModal
                open={showHisory}
                onClose={handleHideHistory}
            />}

            {showAddFunds && <EditAmountModal
                onClose={hideAddFundsModal}
                onProceedClick={handleAddFundsProceed}
                onCancelClick={hideAddFundsModal}
                open={showAddFunds}
                title="Add Funds"
            />}

            {showWithdrawFunds && <EditAmountModal
                onClose={hideWithdrawFundsModal}
                onProceedClick={handleWithdrawFundsProceed}
                onCancelClick={hideWithdrawFundsModal}
                open={showWithdrawFunds}
                title="Withdraw Funds"
                maxLimit={user.balance}
                loading={showWithdrawFunds && loading}
            />}
        </UserLayout>
    );
}


export default WalletPage;