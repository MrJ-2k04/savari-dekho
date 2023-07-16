import CopyrightComp from "Layout/Footer";
import { Grid, styled } from "@mui/material";
import NavBar from "Layout/NavBar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";


const Layout = ({ children }) => {


  const RootStyle = styled("div")({
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    overflow: "hidden",
  });

  const MainStyle = styled("div")(({ theme }) => ({
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

  return (
    <RootStyle>
      <NavBar />
      <MainStyle>
        <Grid sx={{
          // backgroundColor: "#DDE6ED",
          flexGrow: "1",
          // py: 2
        }}>{children}</Grid>
        <CopyrightComp />
      </MainStyle>
    </RootStyle>
  );
};

export default Layout;
