
import { Box, styled } from "@mui/material";
import Animate from "Components/Other/Animate";
import { APP_BAR_MOBILE } from "Store/constants";
import MinimalNavbar from "./MinimalNavbar";


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
      <MinimalNavbar transparent />
      <Animate>
        <MainStyle>
          {children}
        </MainStyle>
      </Animate>
      {/* <MinimalFooter /> */}
    </RootStyle>
  );
};

export default MinimalLayout;
