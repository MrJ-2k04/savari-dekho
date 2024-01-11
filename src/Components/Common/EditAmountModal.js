import { Close, CurrencyRupee } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, IconButton, InputAdornment, Modal, Stack, TextField } from "@mui/material";
import { ADD_FUND_AMOUNTS } from "Store/constants";
import { useState } from "react";

function EditAmountModal({
    open = false,
    onClose,
    title = "Edit Amount",
    btnTitle = "Proceed",
    onProceedClick,
    onCancelClick,
    maxLimit = Infinity,
    helperText = '',
    inputLabel = 'Enter amount',
}) {

    const [amount, setAmount] = useState(0);

    const handleAddChipAmount = (chipAmount) => {
        let newAmount = amount;
        if (typeof amount === 'string') {
            newAmount = parseInt(newAmount);
        }
        setAmount(newAmount + chipAmount);
    }

    const handleProceed = ()=>{
        onProceedClick(amount);
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
                        <Button sx={{ ml: "auto" }} onClick={onCancelClick} variant="outlined">Cancel</Button>
                        <Button sx={{ ml: "auto" }} onClick={handleProceed} variant="contained">{btnTitle}</Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    );
}

export default EditAmountModal;