import UserFooter from "./Footer";
import { Grid, styled } from "@mui/material";
import NavBar from "./NavBar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";
import { motion } from "framer-motion"
import Animate from "Components/Other/Animate";


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

const Layout = ({ children }) => {
  return (
    <RootStyle>
      <NavBar />
      <Animate>
        <MainStyle>
          <Grid flexGrow={1}>
            {children}
          </Grid>
        </MainStyle>
      </Animate>
      <UserFooter />
    </RootStyle>
  );
};


export default Layout;
