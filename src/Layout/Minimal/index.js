
import { Box, Grid, styled } from "@mui/material";
import NavBar from "./NavBar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";
import Animate from "Components/Other/Animate";


const MinimalLayout = ({ children }) => {


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
    // paddingTop: APP_BAR_MOBILE,
    [theme.breakpoints.down("lg")]: {
      paddingTop: APP_BAR_MOBILE,
    },
  }));

  return (
    <RootStyle>
      <NavBar />
      <Animate>
        <MainStyle>
          {children}
        </MainStyle>
      </Animate>
    </RootStyle>
  );
};

export default MinimalLayout;
