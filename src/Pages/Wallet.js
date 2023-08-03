import { Close, CurrencyRupee, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Divider, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from "@mui/material";
import Layout from "Layout";
import { ADD_FUND_AMOUNTS, THEME, WALLET_FAQS } from "Store/constants";
import { useState } from "react";
import { useSelector } from "react-redux";



function Wallet() {
    const themeMode = useSelector(state => state.ui.themeMode);
    const [showAddFunds, setShowAddFunds] = useState(false);

    const handleAddFundsOpen = e => setShowAddFunds(true);
    const handleAddFundsClose = e => setShowAddFunds(false);

    const cardStyle = {
        background: themeMode === THEME.LIGHT ? `linear-gradient(0deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.5)), linear-gradient(315deg, rgb(255, 255, 255) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%)`
            : `linear-gradient(0deg, rgb(25 31 36), rgb(255 255 255 / 0%)),linear-gradient(315deg, rgb(38 45 52) 0%, rgb(55 62 70) 50%, rgb(38 45 52) 50%, rgb(38 45 52) 100%)`,
    }

    return (
        <Layout>
            <Container sx={{ my: 4 }}>
                <Card sx={{ ...cardStyle }}>
                    <CardContent>
                        <Typography textTransform="none" variant="h5" color={"primary"}>Current Balance:</Typography>
                        <Typography variant="h1" color={"primary"}>₹250</Typography>
                    </CardContent>
                    <CardActions sx={{p:2}}>
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
            <Modal open={showAddFunds} onClose={handleAddFundsClose}>
                <Box display={"flex"} alignItems={"center"} height={"100%"} maxHeight={"100vh"} width={"90%"} maxWidth={'460px'} mx={"auto"}>
                    <Card sx={{ width: '100%' }}>
                        <CardHeader
                            title="Add Funds"
                            action={<IconButton onClick={handleAddFundsClose}><Close /></IconButton>}
                        />
                        <CardContent>
                            <Stack spacing={2}>
                                <Box>
                                    <TextField
                                        InputProps={{
                                            startAdornment: <InputAdornment><CurrencyRupee /></InputAdornment>
                                        }}
                                        label='Enter amount'
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
                                            label={`+₹${amt}`}
                                            onClick={e => { }}
                                        />
                                    ))}
                                </Box>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{p:2}}>
                            <Button sx={{ ml: "auto" }} variant="contained">Proceed to Pay</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </Layout>
    );
}


export default Wallet;