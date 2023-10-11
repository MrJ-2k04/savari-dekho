import { Box, styled } from "@mui/material";
import Animate from "Components/Other/Animate";
import MinimalFooter from "Layout/Minimal/MinimalFooter";
import MinimalNavbar from "Layout/Minimal/MinimalNavbar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";

function StaticPageLayout({children}) {

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
            <MinimalNavbar />
            <Animate>
                <MainStyle>
                    {children}
                </MainStyle>
            </Animate>
            <MinimalFooter />
        </RootStyle>
    </>);
}

export default StaticPageLayout;