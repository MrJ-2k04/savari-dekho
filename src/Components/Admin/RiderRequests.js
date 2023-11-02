import { Refresh } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { TableTitle, renderDate, renderImage, showError } from "Utils";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

function RiderRequests() {

    // ############################################# STATES #############################################

    const { loading, getRiderRequests, updateRiderRequest: updateRiderRequests } = useApi();
    const [riderRequests, setRiderRequests] = useState([]);


    // ############################################# HANDLERS #############################################

    const fetchRiderRequests = () => {
        getRiderRequests()
            .then(riderReqs => setRiderRequests(riderReqs))
            .catch(err => showError({ message: err.message }))
    }

    const handleColumnChange = (tableMeta, _onChange, newValue) => {
        updateRiderRequests({
            userId: tableMeta.rowData[0],
            status: newValue,
        }).then(ack => {
            const newReqs = [...riderRequests];
            const currReq = newReqs[tableMeta.rowIndex];
            switch (tableMeta.columnData?.name) {
                case 'riderVerificationStatus':
                    currReq.riderVerificationStatus = newValue;
                    break;

                default:
                    break;
            }
            _onChange(newValue);
            setRiderRequests(newReqs);
        }).catch(err => {
            _onChange(tableMeta.rowData[tableMeta.columnIndex]);
            showError({ message: err.message });
        })
    }

    const renderSelectInput = (options) => (value, tableMeta, _onChange) => {
        return (
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel>Rider Verification Status</InputLabel>
                <Select
                    label="Rider Verification Status"
                    value={value}
                    onChange={(event) =>
                        handleColumnChange(
                            tableMeta,
                            _onChange,
                            event.target.value
                        )
                    }
                >
                    {options.map((option, index) =>
                        <MenuItem value={option.value} key={index}>
                            {option.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        );
    }

    useEffect(() => {
        fetchRiderRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ############################################# TABLE PROPS #############################################


    const options = {
        print: false,
        responsive: 'standard',
        selectableRows: 'none',
        customToolbar: () => (
            <Tooltip title='Refresh'>
                <IconButton onClick={fetchRiderRequests}>
                    <Refresh />
                </IconButton>
            </Tooltip>
        ),
    };
    const columns = [
        {
            name: "_id",
            label: "User ID",
            options: {
                filter: true,
                sort: true,
                display: false,
            },
        },
        {
            name: "profilePicture",
            label: "Profile",
            options: {
                customBodyRender: renderImage('Profile Picture'),
            }
        },
        {
            name: "drivingLicenseFront",
            label: "DL Front",
            options: {
                customBodyRender: renderImage('Driving License Front'),
            }
        },
        {
            name: "drivingLicenseBack",
            label: "DL Back",
            options: {
                customBodyRender: renderImage('Driving License Back'),
            }
        },
        {
            name: 'riderVerificationStatus',
            label: "Rider Verification Status",
            options: {
                customBodyRender: renderSelectInput([
                    { name: 'Verified', value: 'verified' },
                    { name: 'Not Verified', value: 'not verified' },
                    { name: 'Pending', value: 'pending' },
                    { name: 'None', value: 'none' },
                ])
            }
        },
        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "lastName",
            label: "Last Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "mobileNumber",
            label: "Mobile Number",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "address",
            label: "Address",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "dateOfBirth",
            label: "Date of Birth",
            options: {
                customBodyRender: renderDate,
                filter: true,
                sort: true,
            },
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "zipcode",
            label: "Zip Code",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "isVerified",
            label: "Completed Registration",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? 'Yes' : 'No',
            },
        },
        {
            name: "createdAt",
            label: "Created At",
            options: {
                customBodyRender: renderDate,
                filter: true,
                sort: true,
            },
        },
        // {
        //     name: "balance",
        //     label: "Balance",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRender: value => "₹" + value
        //     },
        // },
    ];

    return (<Box>
        <MUIDataTable
            title={<TableTitle title={'Riders List'} loading={loading} />}
            data={riderRequests}
            options={options}
            columns={columns}
        />
    </Box>);
}

export default RiderRequests;