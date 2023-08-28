import { Close } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, Modal, Stack } from "@mui/material";
import { useEffect, useState } from "react";

function WalletHistoryModal({
    open = false,
    onClose,
}) {

    const [transactions, setTransactions] = useState([
        {
            "_id": "64eb2759e50ec44c56c47210",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:37:14.009Z",
            "updatedAt": "2023-08-27T10:37:14.009Z"
        },
        {
            "_id": "64eb27ade668bedd31fc3f43",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:38:37.793Z"
        },
        {
            "_id": "64eb27dbe668bedd31fc3f47",
            "amount": 350,
            "type": "debit",
            "createdAt": "2023-08-27T10:39:23.796Z"
        },
        {
            "_id": "64eb281c7218e7fc01323511",
            "amount": 1000,
            "type": "credit",
            "createdAt": "2023-08-27T10:40:28.058Z"
        },
        {
            "_id": "64eb2c11c79bf36f1e3679c5",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:57:21.722Z"
        },
        {
            "_id": "64eb2c3bc79bf36f1e3679cb",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:58:03.687Z"
        },
        {
            "_id": "64eb3143c79bf36f1e3679da",
            "amount": 450,
            "type": "debit",
            "description": "Test",
            "createdAt": "2023-08-27T11:19:32.010Z"
        },
        {
            "_id": "64eb315cc79bf36f1e3679df",
            "amount": 1500,
            "type": "credit",
            "description": "Paisa hi Paisa!!!",
            "createdAt": "2023-08-27T11:19:56.114Z"
        },
        {
            "_id": "64eb2759e50ec44c56c47210",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:37:14.009Z",
            "updatedAt": "2023-08-27T10:37:14.009Z"
        },
        {
            "_id": "64eb27ade668bedd31fc3f43",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:38:37.793Z"
        },
        {
            "_id": "64eb27dbe668bedd31fc3f47",
            "amount": 350,
            "type": "debit",
            "createdAt": "2023-08-27T10:39:23.796Z"
        },
        {
            "_id": "64eb281c7218e7fc01323511",
            "amount": 1000,
            "type": "credit",
            "createdAt": "2023-08-27T10:40:28.058Z"
        },
        {
            "_id": "64eb2c11c79bf36f1e3679c5",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:57:21.722Z"
        },
        {
            "_id": "64eb2c3bc79bf36f1e3679cb",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:58:03.687Z"
        },
        {
            "_id": "64eb3143c79bf36f1e3679da",
            "amount": 450,
            "type": "debit",
            "description": "Test",
            "createdAt": "2023-08-27T11:19:32.010Z"
        },
        {
            "_id": "64eb315cc79bf36f1e3679df",
            "amount": 1500,
            "type": "credit",
            "description": "Paisa hi Paisa!!!",
            "createdAt": "2023-08-27T11:19:56.114Z"
        },
        {
            "_id": "64eb2759e50ec44c56c47210",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:37:14.009Z",
            "updatedAt": "2023-08-27T10:37:14.009Z"
        },
        {
            "_id": "64eb27ade668bedd31fc3f43",
            "amount": 100,
            "type": "credit",
            "createdAt": "2023-08-27T10:38:37.793Z"
        },
        {
            "_id": "64eb27dbe668bedd31fc3f47",
            "amount": 350,
            "type": "debit",
            "createdAt": "2023-08-27T10:39:23.796Z"
        },
        {
            "_id": "64eb281c7218e7fc01323511",
            "amount": 1000,
            "type": "credit",
            "createdAt": "2023-08-27T10:40:28.058Z"
        },
        {
            "_id": "64eb2c11c79bf36f1e3679c5",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:57:21.722Z"
        },
        {
            "_id": "64eb2c3bc79bf36f1e3679cb",
            "amount": 450,
            "type": "debit",
            "description": "Hello World",
            "createdAt": "2023-08-27T10:58:03.687Z"
        },
        {
            "_id": "64eb3143c79bf36f1e3679da",
            "amount": 450,
            "type": "debit",
            "description": "Test",
            "createdAt": "2023-08-27T11:19:32.010Z"
        },
        {
            "_id": "64eb315cc79bf36f1e3679df",
            "amount": 1500,
            "type": "credit",
            "description": "Paisa hi Paisa!!!",
            "createdAt": "2023-08-27T11:19:56.114Z"
        }
    ]);

    useEffect(() => {
        // fetch transactions from api

    }, []);



    return (open && <Modal onClose={onClose} open={open}>
        <Box display={"flex"} alignItems={"center"}  maxHeight={"90vh"} width={"90%"} maxWidth={'md'} m={"auto"}>
            <Card sx={{ width: '100%' }} >
                <CardHeader
                    title={'Wallet History'}
                    action={<IconButton onClick={onClose}><Close /></IconButton>}
                />
                <CardContent sx={{ overflowX: 'hidden' }}>
                    <Stack spacing={2}>
                        <List>
                            {transactions.map(item => (<ListItem>
                                <ListItemText>
                                    {item.amount}
                                </ListItemText>
                            </ListItem>))}
                        </List>
                        {/* <Box>
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
                                </Box> */}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    </Modal>);
}

export default WalletHistoryModal;