import { Avatar, Box, Drawer, IconButton, Link, Typography, alpha, styled } from "@mui/material";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import { MHidden } from "Components/@Material-Extend";
import LogoWithText from "Components/Common/LogoWithText";
import NavSection from "Components/Common/NavSection";
import { DRAWER_WIDTH, ROUTE_ADMIN, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_PROFILE } from "Store/constants";
import { dashboardLinks } from "./AdminSidebarConfig";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";


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
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

function AdminSidebar({ isOpenSidebar, onCloseSidebar, user = {} }) {

    const { pathname } = useLocation();
    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    const isProfilePage = matchPath({ path: ROUTE_ADMIN_PROFILE, end: true }, pathname);

    const theme = useTheme();
    const activeRootStyle = {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.secondary.main,
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
        "&:before": { display: "block" },
    };

    const renderContent = (
        <Box sx={{ overflow: "auto", height: "100%", paddingRight: "12px" }} display={'flex'} flexDirection={'column'}>
            <Box sx={{ py: 6 }}>
                <LogoWithText
                    to={ROUTE_ADMIN_DASHBOARD}
                // sx={{ flexWrap: 'wrap' }}
                />
            </Box>

            <Box sx={{ mb: 5 }}>
                <Link underline="none" component={RouterLink} to={ROUTE_ADMIN_PROFILE}>
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
                </Link>
            </Box>

            <NavSection navConfig={dashboardLinks} />
            {/* <Typography variant="subtitle1" p={2}>
                Tools
            </Typography> */}

            <Box mt={'auto'}>
                <NavSection navConfig={[{
                    title: 'Logout',
                    icon: <Logout />,
                }]}
                    onClick={() => console.log('logout')}
                />
            </Box>

        </Box>
    );

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