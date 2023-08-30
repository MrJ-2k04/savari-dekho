import { AccountCircle, DashboardOutlined, Logout, Paid, PieChart, VerifiedUser } from "@mui/icons-material";
import { ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_REPORTS, ROUTE_ADMIN_TRANSACTIONS, ROUTE_ADMIN_USERS, ROUTE_ADMIN_VERIFICATION_REQS } from "Store/constants";


const dashboardLink = {
    title: "Dashboard",
    path: ROUTE_ADMIN_DASHBOARD,
    icon: <DashboardOutlined />,
};

const logoutLink = {
    title: 'Logout',
    icon: <Logout />,
}

const toolLinks = [
    {
        title: "Users",
        path: ROUTE_ADMIN_USERS,
        icon: <AccountCircle />,
    },
    {
        title: "Reports",
        path: ROUTE_ADMIN_REPORTS,
        icon: <PieChart />,
    },
    {
        title: "Transactions",
        path: ROUTE_ADMIN_TRANSACTIONS,
        icon: <Paid />,
    },
    {
        title: "Verify Requests",
        path: ROUTE_ADMIN_VERIFICATION_REQS,
        icon: <VerifiedUser />,
    },
];

export {
    dashboardLink,
    toolLinks,
    logoutLink,
}