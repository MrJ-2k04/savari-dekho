import { useTheme } from "@emotion/react";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Drawer, List, Typography, alpha, styled } from "@mui/material";
import { MHidden } from "Components/@Material-Extend";
import LogoWithText from "Components/Common/LogoWithText";
import NavSection, { NavItem } from "Components/Common/NavSection";
import useApi from "Components/Hooks/useApi";
import { DRAWER_WIDTH, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_PROFILE } from "Store/constants";
import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { dashboardLink, logoutLink, toolLinks } from "./AdminSidebarConfig";


const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
    },
}));

const AccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.background.default,
    // "&:hover": {
    //     backgroundColor: theme.palette.action.hover,
    // },
}));

function AdminSidebar({ isOpenSidebar, onCloseSidebar, user = {} }) {

    // ######################################################### STATES #########################################################

    const { pathname, state } = useLocation();
    const { logoutUser } = useApi();
    const match = (path) => path ? !!(
        matchPath({ path, end: false }, pathname) &&
        (path.state || state ? path.state === state : true)
    ) : false;

    // ######################################################### USE EFFECTS #########################################################

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    const isProfilePage = matchPath({ path: ROUTE_ADMIN_PROFILE, end: true }, pathname);

    // ######################################################### STYLES #########################################################

    const theme = useTheme();
    const activeRootStyle = {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.secondary.main,
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
        "&:before": { display: "block" },
    };

    // ######################################################### CONTENT #########################################################

    const renderContent = (
        <Box sx={{ overflow: "auto", height: "100%", paddingRight: "12px" }} display={'flex'} flexDirection={'column'}>
            <Box pt={2} pb={6} pl={1}>
                <LogoWithText textVariant="h4" sx={{ width: { xs: '72px', md: '56px' } }} to={ROUTE_ADMIN_DASHBOARD} />
            </Box>

            <Box mb={5}>
                {/* <Link underline="none" component={RouterLink} to={ROUTE_ADMIN_PROFILE}> */}
                    <AccountStyle
                        sx={{
                            ...(isProfilePage && activeRootStyle),
                        }}
                    >
                        <Avatar src={user.profilePicture} sx={{ width: 40, height: 40 }}>
                            <AccountCircle />
                        </Avatar>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2">{user.firstName}</Typography>
                            <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                                {`Admin`}
                            </Typography>
                        </Box>
                    </AccountStyle>
                {/* </Link> */}
            </Box>

            <List disablePadding>
                <NavItem item={dashboardLink} active={match} />
            </List>
            <Typography variant="subtitle1" p={2}>
                Tools
            </Typography>
            <NavSection navConfig={toolLinks} />

            <List disablePadding sx={{ mt: 'auto' }} onClick={logoutUser} >
                <NavItem item={logoutLink} active={() => false} />
            </List>
        </Box>
    );

    // ######################################################### BOILERPLATE #########################################################

    return (
        <RootStyle>
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH, p: 3 },
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            p: 3,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    );
}

export default AdminSidebar;