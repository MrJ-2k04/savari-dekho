

import { AccountBalance, AddCircle, ArrowForwardIos, Delete, LockReset, Logout, PendingActions, Verified } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, LinearProgress, Stack, Typography } from "@mui/material";
import { ROUTE_BANK, ROUTE_BANK_ADD, ROUTE_RESET_PASSWORD, ROUTE_VEHICLE_ADD } from "Store/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Cancel, QuestionMark } from "@mui/icons-material";
import useApi from "Components/Hooks/useApi";
import { ROUTE_VEHICLE } from "Store/constants";
import { selectUser } from "Store/selectors";
import { showError } from "Utils";
import { useEffect, useState } from "react";

function AccountSection() {

    const user = useSelector(selectUser);

    const [vehicles, setVehicles] = useState([]);
    const [banks, setBanks] = useState([]);
    const { loading, getVehicles, getBanks } = useApi();

    // const banks = [
    //     {
    //         id: 1,
    //         ifsc: "ABCD123456",
    //         accountNumber: "1234567890",
    //         branchName: "Main Branch",
    //         name: "State Bank of India",
    //         beneficiaryName: "John Doe",
    //     },
    //     {
    //         id: 2,
    //         ifsc: "EFGH789012",
    //         accountNumber: "9876543210",
    //         branchName: "Downtown Branch",
    //         name: "Bank of Baroda",
    //         beneficiaryName: "Jane Smith",
    //     },
    //     // Add more bank objects as needed
    // ];

    const fetchVehicles = () => {
        getVehicles()
            .then(newVehicles => setVehicles(newVehicles))
            .catch(err => showError({ message: err.message }));
    }

    const fetchBanks = () => {
        getBanks()
            .then(banks => setBanks(banks))
            .catch(err => showError({ message: err.message }));
    }

    useEffect(() => {
        fetchVehicles();
        fetchBanks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Stack spacing={4}>

                <Card>
                    <CardHeader title={"Bank Accounts"} />
                    {loading && <LinearProgress />}
                    <CardContent sx={{ pt: 1 }}>
                        <Box>
                            <Stack spacing={1} maxWidth={'400px'} mx={'auto'}>
                                {banks.map((bank, i) =>
                                    <Button
                                        key={i}
                                        size="large"
                                        fullWidth
                                        startIcon={<AccountBalance />}
                                        endIcon={<ArrowForwardIos />}
                                        LinkComponent={Link}
                                        to={`${ROUTE_BANK}/${bank._id}`}>
                                        <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                            {`${bank.bankName} - Account ending ${bank.accountNumber?.toString().slice(-4)}`}
                                        </Typography>
                                    </Button>
                                )}
                                <Button
                                    variant="text"
                                    // color="secondary"
                                    size="large"
                                    sx={{ justifyContent: 'start' }}
                                    startIcon={<AddCircle />}
                                    LinkComponent={Link}
                                    to={ROUTE_BANK_ADD}
                                >
                                    Add Bank Account
                                </Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

                {user.riderVerificationStatus && <>
                    <Card>
                        <CardHeader title={'Vehicles'} />
                        {loading && <LinearProgress />}
                        <CardContent sx={{ pt: 1 }}>
                            <Box>
                                <Stack spacing={1} maxWidth={'400px'} mx={'auto'}>

                                    <Stack spacing={1}>
                                        {vehicles.map((vehicle, i) => {
                                            let Icon;
                                            switch (vehicle.verificationStatus) {
                                                case 'verified':
                                                    Icon = <Verified color="success" />;
                                                    break;

                                                case 'not verified':
                                                    Icon = <Cancel color="error" />
                                                    break;

                                                case 'pending':
                                                    Icon = <PendingActions color="warning" />;
                                                    break;

                                                default:
                                                    Icon = <QuestionMark color="primary" />;
                                                    break;
                                            }

                                            return <Button
                                                key={i}
                                                size="large"
                                                fullWidth startIcon={Icon}
                                                endIcon={<ArrowForwardIos />}
                                                LinkComponent={Link}
                                                to={`${ROUTE_VEHICLE}/${vehicle._id}`}>
                                                <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                                    {vehicle.model}
                                                </Typography>
                                            </Button>
                                        })}
                                    </Stack>
                                    <Button
                                        variant="text"
                                        // color="secondary"
                                        size="large"
                                        sx={{ justifyContent: 'start' }}
                                        startIcon={<AddCircle />}
                                        LinkComponent={Link}
                                        to={ROUTE_VEHICLE_ADD}
                                    >
                                        Add Vehicle
                                    </Button>

                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </>
                }

                <Card>
                    <CardHeader title={'Account Settings'} />
                    <CardContent>
                        <Box>
                            <Stack spacing={1} maxWidth={'400px'} mx={'auto'}>
                                <Button
                                    size="large"
                                    fullWidth startIcon={<LockReset />}
                                    endIcon={<ArrowForwardIos />}
                                    LinkComponent={Link}
                                    to={ROUTE_RESET_PASSWORD}>
                                    <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                        Reset Password
                                    </Typography>
                                </Button>
                                <Button
                                    size="large"
                                    fullWidth startIcon={<Logout />}>
                                    <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                        Logout
                                    </Typography>
                                </Button>
                                <Button
                                    size="large"
                                    color="error"
                                    sx={{ mt: "32px !important" }}
                                    fullWidth startIcon={<Delete />}>
                                    <Typography flexGrow={1} variant="button" textAlign={'left'}>
                                        Delete Account
                                    </Typography>
                                </Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

            </Stack>
        </>
    );
}

export default AccountSection;