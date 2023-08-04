import { Close, CurrencyRupee } from "@mui/icons-material";
import { Box, Button, CardActions, CardContent, CardHeader, Chip, IconButton, InputAdornment, Modal, Stack, TextField, Typography, Card } from "@mui/material";
import { ADD_FUND_AMOUNTS } from "Store/constants";
import { useState } from "react";

function EditAmountModal({
    open = false,
    onClose,
    title = "Edit Amount",
    btnTitle = "Proceed",
    onSubmit,
    onCancel,
    maxLimit = Infinity,
    helperText = '',
    inputLabel = 'Enter amount',
}) {

    const [amount, setAmount] = useState(0);

    return (
        <Modal open={open} onClose={onClose}>
            
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
                                    onChange={e=>setAmount(parseInt(e.target.value))}
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
                                        onClick={e => { }}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button sx={{ ml: "auto" }} onClick={onSubmit} variant="contained">{btnTitle}</Button>
                        <Button sx={{ ml: "auto" }} onClick={onCancel} variant="contained">Cancel</Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    );
}

export default EditAmountModal;