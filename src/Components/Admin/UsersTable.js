import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import useApi from "Components/Hooks/useApi";
import { TableTitle, renderDate, renderImage, showError } from "Utils";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";



function UsersTable() {

    const { loading, getUsersList } = useApi();
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        getUsersList()
            .then(usersList => setUsers(usersList))
            .catch(err => showError({ message: err.message }))
    }

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const options = {
        print: false,
        responsive: 'standard',
        selectableRows: 'none',
        customToolbar: () => <Tooltip title='Refresh'><IconButton onClick={fetchUsers}><Refresh /></IconButton></Tooltip>,
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
            name: "isVerified",
            label: "Is Verified",
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
        {
            name: "updatedAt",
            label: "Updated At",
            options: {
                customBodyRender: renderDate,
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
            name: "balance",
            label: "Balance",
            options: {
                filter: false,
                sort: true,
                customBodyRender: value => "₹" + value
            },
        },
    ];

    return (<Box>
        <MUIDataTable
            title={<TableTitle title={"Users List"} loading={loading} />}
            data={users}
            options={options}
            columns={columns}
        />
    </Box>);
}

export default UsersTable;