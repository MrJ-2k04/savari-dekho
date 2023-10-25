import { Box, Grid, styled } from "@mui/material";
import MinimalFooter from "Layout/Minimal/MinimalFooter";
import NavBar from "Layout/User/NavBar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";

function MapPageLayout({ children }) {

    const RootStyle = styled("div")({
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        overflow: "hidden",
    });

    const MainStyle = styled(Box)(({ theme }) => ({
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "auto",
        minHeight: "100vh",
        paddingTop: APP_BAR_MOBILE,
        [theme.breakpoints.up("sm")]: {
            paddingTop: APP_BAR_DESKTOP,
        },
    }));

    return (<>
        <RootStyle>
            <NavBar />
            <MainStyle>
                <Box flexGrow={1} position={'relative'}>
                    {children}
                </Box>
                <MinimalFooter sx={{ mt: 0 }} />
            </MainStyle>
        </RootStyle >
    </>);
}

export default MapPageLayout;