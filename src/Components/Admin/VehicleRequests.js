import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { TableSkeleton } from "Components/Skeletons";
import { renderColor, renderDate, renderImage, showError } from "Utils";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

function VehicleRequests() {

    const { loading, getVehicleRequests } = useApi();
    const [vehicleRequests, setVehicleRequests] = useState([]);

    const fetchVehicleRequests = () => {
        getVehicleRequests()
            .then(vehicleReqs => setVehicleRequests(vehicleReqs))
            .catch(err => showError({ message: err.message }))
    }

    useEffect(() => {
        fetchVehicleRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [];

    const options = {

    };

    return (<Box>
        {loading ? <TableSkeleton rows={6} columns={6} />
            :
            <MUIDataTable
                title="Vehicles List"
                data={vehicleRequests}
                options={{
                    print: false,
                    responsive: 'standard',
                    customToolbar: () => <Tooltip title='Refresh'><IconButton onClick={fetchVehicleRequests}><Refresh /></IconButton></Tooltip>,
                }}
                columns={[
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
                            filterList: ['pending']
                        },
                    },
                    {
                        name: "rcBook",
                        label: "RC Book",
                        options: {
                            filter: true,
                            sort: true,
                            customBodyRender: renderImage,
                        },
                    },
                    {
                        name: "insurance",
                        label: "Insurance",
                        options: {
                            filter: true,
                            sort: true,
                            customBodyRender: renderImage,
                        },
                    },
                ]}
            />
        }
    </Box>);
}

export default VehicleRequests;