import { Refresh } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { TableTitle, renderColor, renderImage, showError } from "Utils";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

function VehicleRequests() {

    const { loading, getVehicleRequests, updateVehicleRequest: updateVehicleRequests } = useApi();
    const [vehicleRequests, setVehicleRequests] = useState([]);

    const handleColumnChange = (tableMeta, _onChange, newValue) => {
        updateVehicleRequests({
            vehicleId: tableMeta.rowData[0],
            status: newValue,
        }).then(ack => {
            const newReqs = [...vehicleRequests];
            const currReq = newReqs[tableMeta.rowIndex];
            switch (tableMeta.columnData?.name) {
                case 'verificationStatus':
                    currReq.verificationStatus = newValue;
                    break;

                default:
                    break;
            }
            _onChange(newValue);
            setVehicleRequests(newReqs);
        }).catch(err => {
            _onChange(tableMeta.rowData[tableMeta.columnIndex]);
            showError({ message: err.message });
        })
    }

    const renderSelectInput = (options) => (value, tableMeta, _onChange) => {
        return (
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel>Verification Status</InputLabel>
                <Select
                    label="Verification Status"
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

    const fetchVehicleRequests = () => {
        getVehicleRequests()
            .then(vehicleReqs => setVehicleRequests(vehicleReqs))
            .catch(err => showError({ message: err.message }))
    }

    useEffect(() => {
        fetchVehicleRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            name: "_id",
            label: "Vehicle ID",
            options: {
                filter: true,
                sort: true,
                display: false,
            },
        },
        {
            name: "type",
            label: "Class",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "fuelType",
            label: "Fuel Type",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "brand",
            label: "Brand",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "model",
            label: "Model",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "plateNumber",
            label: "Plate Number",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "manufactureYear",
            label: "Manufacture Year",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "color",
            label: "Color",
            options: {
                filter: true,
                sort: true,
                customBodyRender: renderColor,
            },
        },
        {
            name: "totalSeats",
            label: "Total Seats",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "airBags",
            label: "Air Bags",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "hasAc",
            label: "Has AC",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? 'Yes' : 'No'
            },
        },
        {
            name: "verificationStatus",
            label: "Verification Status",
            options: {
                filter: true,
                sort: true,
                // filterList: ['pending'],
                customBodyRender: renderSelectInput([
                    { name: 'Verified', value: 'verified' },
                    { name: 'Not Verified', value: 'not verified' },
                    { name: 'Pending', value: 'pending' },
                ]),
            },
        },
        {
            name: "rcBook",
            label: "RC Book",
            options: {
                filter: true,
                sort: true,
                customBodyRender: renderImage('RC Book'),
            },
        },
        {
            name: "insurance",
            label: "Insurance",
            options: {
                filter: true,
                sort: true,
                customBodyRender: renderImage('Insurance'),
            },
        },
    ];

    const options = {
        print: false,
        responsive: 'standard',
        selectableRows: 'none',
        customToolbar: () => <Tooltip title='Refresh'><IconButton onClick={fetchVehicleRequests}><Refresh /></IconButton></Tooltip>,
    };

    return (<Box>
        <MUIDataTable
            title={<TableTitle title={'Vehicles List'} loading={loading} />}
            data={vehicleRequests}
            options={options}
            columns={columns}
        />
    </Box>);
}

export default VehicleRequests;