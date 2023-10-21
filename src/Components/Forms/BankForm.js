import { AccountBalance, ArrowBackIos, Delete, Save, Search, Security } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { BANK_ACCOUNT_TYPES, ROUTE_PROFILE_DASHBOARD } from "Store/constants";
import { capitalizeWords, isEmptyString, showError, showSuccess } from "Utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function BankForm({ viewMode = false }) {

    const { state } = useLocation();
    const nav = useNavigate();
    const { id } = useParams();
    const { loading, createBank, getBankDetails, updateBankById, deleteBankById } = useApi();




    // ################################################ STATES ################################################

    // For ViewMode
    const [bankId, setBankId] = useState(id || null);

    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [ifscChecking, setIfscChecking] = useState(false);
    const [branchName, setBranchName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [description, setDescription] = useState('') // Optional


    // Error States
    const [accountNumberError, setAccountNumberError] = useState('');
    const [ifscError, setIfscError] = useState('');
    const [branchNameError, setBranchNameError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [accTypeError, setAccTypeError] = useState('');
    const [beneficiaryError, setBeneficiaryError] = useState('');

    // ################################################ API HANDLERS ################################################

    const syncBankDetails = () => {
        getBankDetails(id)
            .then(bankDetails => {
                setBankId(bankDetails._id);

                setAccountNumber(bankDetails.accountNumber);
                setIfsc(bankDetails.ifsc);
                setBeneficiaryName(bankDetails.beneficiaryName);
                setBranchName(bankDetails.branchName);
                setBankName(bankDetails.bankName);
                setAccountType(bankDetails.accountType || "");
                setDescription(bankDetails.description || "");
            })
            .catch(err => showError({ message: err.message }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (isEmptyString(accountNumber)) {
            setAccountNumberError('Please enter a valid Account number');
            isValid = false;
        }

        if (isEmptyString(ifsc)) {
            setIfscError('Please enter a valid IFSC Code');
            isValid = false;
        }

        if (isEmptyString(branchName)) {
            setBranchNameError('Please enter a valid Branch name');
            isValid = false;
        }

        if (isEmptyString(accountType)) {
            setAccTypeError('Please specify the Account type');
            isValid = false;
        }

        if (isEmptyString(bankName)) {
            setBankNameError('Please enter a valid Bank name');
            isValid = false;
        }

        if (isEmptyString(beneficiaryName)) {
            setBeneficiaryError('Please enter a valid Beneficiary name');
            isValid = false;
        }

        if (!isValid) return;

        let payload = {
            ifsc,
            accountNumber,
            beneficiaryName,
            branchName,
            bankName,
            accountType,
            description,
        };

        if (viewMode) {
            updateBankById(bankId, payload)
                .then(ack => {
                    showSuccess({ message: ack.message });
                    syncBankDetails();
                }).catch(err => showError({ message: err.message }))
        } else {
            // ADD New Bank using API
            createBank(payload).then(ack => {
                if (!state) {
                    nav(ROUTE_PROFILE_DASHBOARD);
                }
            }).catch(err => showError({ message: err.message }));
        }
    }

    const handleDelete = () => {
        deleteBankById(bankId).then(async (ack) => {
            await showSuccess({ message: ack.message || "Bank Deleted Successfully!" })
            nav(-1);
        }).catch(err => showError({ message: err.message }))
    }

    // ################################################ STATE HANDLERS ################################################


    const handleIfscCheck = async (event) => {
        if (isEmptyString(ifsc)) return;

        try {
            setIfscChecking(true);
            // Make an API request to fetch bank details by IFSC
            const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
            if (response.ok) {
                const data = await response.json();
                setBankName(data.BANK);
                setBankNameError("");
                setBranchName(data.BRANCH);
                setBranchNameError("");
                setIfscError("");
            } else {
                setBankName("");
                setBankNameError("");
                setBranchName("");
                setBranchNameError("");
                setIfscError("No matching bank found!");
            }
        } catch (error) {
            console.error('Error fetching bank details:', error);
            setBankName("");
            setBankNameError("");
            setBranchName("");
            setBranchNameError("");
            setIfscError("");
        } finally {
            setIfscChecking(false);
        }
    };


    useEffect(() => {
        if (!viewMode) return;

        syncBankDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<form onSubmit={handleSubmit} noValidate>
        <Stack spacing={6} justifyContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={2} width={"100%"} justifyContent={"center"}>
                <AccountBalance fontSize="large" color={"primary"} />
                <Typography variant="h3" textAlign='center' color={"primary"}>
                    {!viewMode ? "Add a Bank Account" : `${bankName} - ${branchName}`}
                </Typography>
            </Stack>

            <Box width={'100%'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="IFSC Code"
                            placeholder="For ex: SBIN0005097"
                            fullWidth
                            InputProps={{
                                endAdornment: ifscChecking ? <Box display={"flex"}>
                                    <CircularProgress size={"18px"} />
                                </Box> : <IconButton onClick={handleIfscCheck}><Search /></IconButton>
                            }}
                            value={ifsc}
                            onChange={e => setIfsc(e.target.value.toUpperCase())}
                            onBlur={handleIfscCheck}
                            required
                            error={!isEmptyString(ifscError)}
                            helperText={ifscError}
                        />
                    </Grid>
                    {/* <Grid item xs={12} /> */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Account Number"
                            fullWidth
                            value={accountNumber}
                            inputProps={{
                                inputMode: "numeric"
                            }}
                            onChange={e => {
                                setAccountNumber(e.target.value)
                                setAccountNumberError("");
                            }}
                            onBlur={e => {
                                if (e.target.value.length < 8) {
                                    setAccountNumberError("Account number must be of atleast 8 digits");
                                } else {
                                    setAccountNumberError("");
                                }
                            }}
                            type="number"
                            required
                            error={!isEmptyString(accountNumberError)}
                            helperText={accountNumberError}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Beneficiary Name"
                            fullWidth
                            value={beneficiaryName}
                            onChange={e => {
                                setBeneficiaryName(e.target.value)
                                setBeneficiaryError("");
                            }}
                            onBlur={e => setBeneficiaryError(isEmptyString(e.target.value) ? "Beneficiary Name is Required" : "")}
                            required
                            error={!isEmptyString(beneficiaryError)}
                            helperText={beneficiaryError}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Branch Name"
                            fullWidth
                            value={branchName}
                            onChange={e => setBranchName(e.target.value)}
                            onBlur={e => setBranchNameError(isEmptyString(e.target.value) ? "Branch Name is Required" : "")}
                            required
                            error={!isEmptyString(branchNameError)}
                            helperText={branchNameError}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Bank Name"
                            fullWidth
                            value={bankName}
                            onChange={e => setBankName(e.target.value)}
                            onBlur={e => setBankNameError(isEmptyString(e.target.value) ? "Bank Name is Required" : "")}
                            required
                            error={!isEmptyString(bankNameError)}
                            helperText={bankNameError}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required error={!isEmptyString(accTypeError)}>
                            <InputLabel id="accType">Account Type</InputLabel>
                            <Select
                                labelId="accType"
                                label={`Account Type`}
                                value={accountType}
                                onChange={(e) => {
                                    setAccTypeError('');
                                    setAccountType(e.target.value);
                                }}
                                required
                            >
                                {BANK_ACCOUNT_TYPES.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value}>
                                            {capitalizeWords(value)}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{accTypeError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description (Optional)"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={4}
                            multiline
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>

            <Stack direction={'row'} spacing={3} rowGap={3} width={'100%'} flexWrap={'wrap'} justifyContent={'space-between'}>

                {viewMode &&
                    <>
                        <Button
                            startIcon={<Delete />}
                            size="large"
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                            sx={{ mr: 'auto', order: { xs: 3, sm: 0 }, width: { xs: '100%', sm: 'fit-content' } }}
                        >
                            Delete
                        </Button>
                        <Button
                            startIcon={<ArrowBackIos />}
                            size="large"
                            color="secondary"
                            variant="outlined"
                            onClick={e => nav(ROUTE_PROFILE_DASHBOARD)}
                            sx={{ ml: "0 !important" }}
                        >
                            Go Back
                        </Button>
                    </>
                }

                <LoadingButton
                    loading={loading}
                    type="submit"
                    size="large"
                    variant="contained"
                    startIcon={!viewMode ? <Security /> : <Save />}
                    sx={{ mx: 'auto' }}
                >
                    {!viewMode ? "Proceed to Add Bank" : "Save changes"}
                </LoadingButton>
            </Stack>
        </Stack>
    </form >);
}

export default BankForm;