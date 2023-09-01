import { Close, Error, HelpOutline, HourglassTop, Refresh } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { TableSkeleton } from "Components/Skeletons";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

function WalletHistoryModal({
    open = false,
    onClose,
}) {

    const [transactions, setTransactions] = useState([]);
    const { loading, fetchWalletTransactions } = useApi();

    const fetchRecords = () => {
        fetchWalletTransactions()
            .then(trans => {
                const finalTransactions = trans
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(tran => {
                        const dateTime = new Date(tran.createdAt)
                        const temp = {
                            date: dateTime.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }),
                            time: dateTime.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric' })
                        }
                        tran.createdAt = `${temp.date} - ${temp.time}`;
                        return tran;
                    })
                setTransactions(finalTransactions)
            })
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        fetchRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatDateTime = (value) => {
        const newVal = value.split('-')?.map(v => v.trim())
        return <Stack>
            <Typography variant="body1">{newVal[0]}</Typography>
            <Typography variant="body2" color={'InactiveCaptionText'}>{newVal[1]}</Typography>
        </Stack>;
    }

    const formatAmount = (value, tableMeta, updateValue) => {
        const transactionType = transactions[tableMeta?.rowIndex]?.type;
        const status = transactions[tableMeta?.rowIndex].status;
        var Icon;
        switch (status) {
            case 'completed':
                Icon = <></>//<CheckCircle color="success" />;
                break;

            case 'failed':
                Icon = <Error color="error" />;
                break;

            case 'pending':
                Icon = <HourglassTop color="warning" />;
                break;

            default:
                Icon = <HelpOutline color="primary" />;
                break;
        }
        const color = transactionType === 'credit' ? '#31b835' : 'red';
        return <Stack direction={'row'} spacing={1}>
            {Icon}
            <Typography color={color}>{transactionType === 'credit' ? "+" : "-"}{value.toLocaleString()}</Typography>
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
                sort: true,
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
                <CardContent>
                    {loading ? <TableSkeleton rows={6} columns={4} />
                        :
                        <Box minHeight={'500px'} maxHeight='80vh' sx={{ overflowX: 'hidden' }}>
                            <MUIDataTable
                                title={'Wallet History'
                                    // <Typography color={'primary'} variant="h3">{`₹${user.balance || 0}`}</Typography>
                                }
                                columns={columns}
                                data={transactions}
                                options={{
                                    sort: false,
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