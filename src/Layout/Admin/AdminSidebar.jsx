import { Drawer } from "@mui/material";
import { MHidden } from "Components/@Material-Extend";
import { DRAWER_WIDTH } from "Store/constants";


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

function AdminSidebar({ isOpenSidebar, onCloseSidebar }) {


    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // const renderContent = (
    //     <Box sx={{ overflow: "auto", height: "100%", paddingRight: "12px" }}>
    //         <Box sx={{ py: 6 }}>
    //             <Logo sx={{ width: "100%" }} />
    //         </Box>

    //         <Box sx={{ mb: 5 }}>
    //             <Link underline="none" component={RouterLink} to={ROUTE_ADVISOR_PROFILE}>
    //                 <AccountStyle
    //                     sx={{
    //                         ...(isProfilePage && activeRootStyle),
    //                     }}
    //                 >
    //                     <Avatar src={account.photoURL} sx={{ width: 40, height: 40 }}>
    //                         <AccountCircle />
    //                     </Avatar>
    //                     <Box sx={{ ml: 2 }}>
    //                         <Typography variant="subtitle2">{account.displayName}</Typography>
    //                         <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
    //                             {account.role}
    //                         </Typography>
    //                     </Box>
    //                 </AccountStyle>
    //             </Link>
    //         </Box>

    //         {app === APPS.RETIREMENT_CALC ? (
    //             <>
    //                 <Typography variant="subtitle1" p={2}>
    //                     Retirement Calculator
    //                 </Typography>
    //                 <NavSection navConfig={retirementCalcPageLinks} />

    //                 <Typography variant="subtitle1" p={2}>
    //                     Page Links
    //                 </Typography>
    //                 <NavSection navConfig={otherLinks} />
    //             </>
    //         ) : app === APPS.INSURANCE_CALC ? (
    //             <>
    //                 <Typography variant="subtitle1" p={2}>
    //                     Insurance Calculator
    //                 </Typography>
    //                 <NavSection navConfig={insuranceCalcPageLinks} />

    //                 <Typography variant="subtitle1" p={2}>
    //                     Page Links
    //                 </Typography>
    //                 <NavSection navConfig={otherLinks} />
    //             </>
    //         ) : app === APPS.TOOLS ? (
    //             <>
    //                 <Typography variant="subtitle1" p={2}>
    //                     Engagement Tools
    //                 </Typography>
    //                 <NavSection navConfig={formPageLinks} />

    //                 <Typography variant="subtitle1" p={2}>
    //                     Page Links
    //                 </Typography>
    //                 <NavSection navConfig={otherLinks} />
    //             </>
    //         ) : (
    //             <NavSection navConfig={dashboardLinks} />
    //         )}
    //     </Box>
    // );

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