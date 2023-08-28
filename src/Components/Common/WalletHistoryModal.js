import { AddCircle, Close, Refresh, RemoveCircle } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import useFetch from "Components/Hooks/useFetch";
import { TableSkeleton } from "Components/Skeletons";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

function WalletHistoryModal({
    open = false,
    onClose,
}) {

    const [transactions, setTransactions] = useState([]);
    const { loading, fetchWalletTransactions } = useFetch();

    const fetchRecords = () => {
        fetchWalletTransactions()
            .then(trans => setTransactions(trans))
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    const formatDateTime = (value) => {
        const dateTime = new Date(value);
        const formattedDate = dateTime.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
        const formattedTime = dateTime.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric' });

        return <Stack>
            <Typography variant="body1">{formattedDate}</Typography>
            <Typography variant="body2" color={'InactiveCaptionText'}>{formattedTime}</Typography>
        </Stack>;
    }

    const formatAmount = (value, tableMeta, updateValue) => {
        const transactionType = transactions[tableMeta?.rowIndex]?.type;
        const color = transactionType === 'credit' ? '#31b835' : 'red';
        const Icon = transactionType === 'credit' ? AddCircle : RemoveCircle;
        return <Stack direction={'row'} spacing={1}>
            <Icon sx={{ color }} />
            <Typography color={color}>{value.toLocaleString()}</Typography>
        </Stack>
    }

    const columns = [
        {
            name: '_id',
            label: 'Transaction ID',
            options: {
                display: 'false'
            }
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                customBodyRender: (value) => <Typography>{value}</Typography>
            }
        },
        {
            name: 'createdAt',
            label: 'Date/Time',
            options: {
                customBodyRender: formatDateTime,
                sortDirection: 'desc'
            },
        },
        {
            name: 'amount',
            label: 'Amount',
            options: { customBodyRender: formatAmount }
        },
    ]

    return (<Modal onClose={onClose} open={open}>
        <Box display={"flex"} alignItems={"center"} height={'100%'} maxWidth={'md'} m={"auto"}>
            <Card sx={{ width: '100%' }} >
                {/* <CardHeader
                    title={'Wallet History'}
                    action={<IconButton onClick={onClose}><Close /></IconButton>}
                /> */}
                <CardContent sx={{ minHeight: "400px" }}>
                    {loading ? <TableSkeleton rows={5} columns={4} />
                        :
                        <Box maxHeight='75vh' sx={{ overflowX: 'hidden' }}>
                            <MUIDataTable
                                title={'Wallet History'
                                    // <Typography color={'primary'} variant="h3">{`₹${user.balance || 0}`}</Typography>
                                }
                                columns={columns}
                                data={transactions}
                                options={{
                                    customToolbar: () => [
                                        <Tooltip title='Refresh'><IconButton onClick={fetchRecords}><Refresh /></IconButton></Tooltip>,
                                        <Tooltip title='Close'><IconButton onClick={onClose}><Close /></IconButton></Tooltip>
                                    ],
                                    rowsPerPageOptions: [5, 10, 50],
                                    rowsPerPage: 5,
                                    selectableRows: 'none',
                                    elevation: 0,
                                    responsive: 'standard',
                                    download: false,
                                    print: false,
                                    textLabels: {
                                        body: {
                                            noMatch: 'No transactions found'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    }
                </CardContent>
            </Card>
        </Box>
    </Modal>);
}

export default WalletHistoryModal;