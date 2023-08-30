import { Close, CurrencyRupee } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, IconButton, InputAdornment, Modal, Stack, TextField } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { ADD_FUND_AMOUNTS } from "Store/constants";
import { selectUser } from "Store/selectors";
import { useState } from "react";
import { useSelector } from "react-redux";

function EditAmountModal({
    open = false,
    onClose,
    title = "Edit Amount",
    btnTitle = "Proceed",
    onSuccess,
    onCancel,
    maxLimit = Infinity,
    helperText = '',
    inputLabel = 'Enter amount',
}) {

    const [amount, setAmount] = useState(0);
    const { requestPayment, validatePayment, cancelPayment } = useApi();
    const user = useSelector(selectUser);

    const handleAddChipAmount = (chipAmount) => {
        let newAmount = amount;
        if (typeof amount === 'string') {
            newAmount = parseInt(newAmount);
        }
        setAmount(newAmount + chipAmount);
    }

    const handleAddFundsSuccess = (resp) => {
        // Send this response to the backend for verification
        const credentials = {
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature,
        }
        console.log("Payment success", resp);
        validatePayment(credentials).then(msg => {
            onSuccess(msg);
        }).catch(err => {
            console.error(err.message);
            onCancel(err.message);
        });
    }

    const handleAddFundsProceed = () => {
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
                        cancelPayment(order.id).then(msg => onCancel(msg)).catch(err => onCancel());
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
            onCancel(err.message);
        });
    }

    const handleAddFundsCancel = () => {
        onCancel();
    }

    return (
        open && <Modal open={open} onClose={onClose}>
            <Box display={"flex"} alignItems={"center"} height={"100%"} maxHeight={"100vh"} width={"90%"} maxWidth={'460px'} mx={"auto"}>
                <Card sx={{ width: '100%' }}>
                    <CardHeader
                        title={title}
                        action={<IconButton onClick={onClose}><Close /></IconButton>}
                    />
                    <CardContent>
                        <Stack spacing={2}>
                            <Box>
                                <TextField
                                    value={amount}
                                    onChange={e => setAmount(parseInt(e.target.value) || 0)}
                                    inputProps={{
                                        min: 0,
                                        max: maxLimit,
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CurrencyRupee /></InputAdornment>,
                                    }}
                                    helperText={helperText}
                                    label={inputLabel}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box display={"flex"} width={"100%"} gap={1} flexWrap={'wrap'}>
                                {ADD_FUND_AMOUNTS.map(amt => (
                                    <Chip
                                        color="primary"
                                        variant="filled"
                                        key={amt}
                                        label={`+₹${amt}`}
                                        onClick={() => handleAddChipAmount(amt)}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button sx={{ ml: "auto" }} onClick={handleAddFundsCancel} variant="outlined">Cancel</Button>
                        <Button sx={{ ml: "auto" }} onClick={handleAddFundsProceed} variant="contained">{btnTitle}</Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    );
}

export default EditAmountModal;