import {
  AccountBalanceWallet,
  AccountCircle,
  DirectionsCar,
  Login,
  Logout,
  PersonAdd,
  SwapHoriz,
  TimeToLeave
} from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  MenuItem,
  alpha,
  styled
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ROLES, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RIDES, ROUTE_RIDE_PUBLISH, ROUTE_WALLET, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import Logo from "Components/Logo";
import AccountMenu from "Components/Other/AccountMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));



export default function NavBar() {

  const dispatch = useDispatch();
  const themeMode = useSelector(state => state.ui.themeMode);
  const [user, setUser] = useState(false);

  const login = () => setUser(true);
  const logout = () => setUser(false);

  const userMenuItems = <>
    <MenuItem component={Link} to={ROUTE_PROFILE}>
      <ListItemIcon>
        <AccountCircle fontSize="small" />
      </ListItemIcon>
      Profile
    </MenuItem>
    <MenuItem component={Link} to={ROUTE_WALLET}>
      <ListItemIcon>
        <AccountBalanceWallet fontSize="small" />
      </ListItemIcon>
      Wallet
    </MenuItem>
    <MenuItem component={Link} to={ROUTE_RIDES}>
      <ListItemIcon>
        <TimeToLeave fontSize="small" />
      </ListItemIcon>
      Your Rides
    </MenuItem>
    <Divider />
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </>;

  const guestMenuItems = <>
    <MenuItem onClick={login}>
      <ListItemIcon>
        <Login fontSize="small" />
      </ListItemIcon>
      Login
    </MenuItem>
    <MenuItem component={Link} to={ROUTE_REGISTER}>
      <ListItemIcon>
        <PersonAdd fontSize="small" />
      </ListItemIcon>
      Sign Up
    </MenuItem>
  </>;

  return (
    <RootStyle
    // variant="elevation"
    // color="transparent"
    >
      <>
        <Toolbar>
          <Logo />
          <Box flexGrow={1}>
            <Typography
              variant="h3"
              noWrap
              component={Link}
              to={ROUTE_HOME}
              sx={{
                mr: 2,
                fontWeight: 500,
                // fontSize: { xs: "medium", sm: "large", md: "larger" },
                // letterSpacing: { xs: ".1rem", sm: ".2rem", md: ".3rem" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {SITE_TITLE}
            </Typography>
          </Box>



          <Button
            // className="hover-underline-animation1"
            // onClick={toggleRole}
            LinkComponent={Link}
            to={user ? ROUTE_RIDE_PUBLISH : ROUTE_LOGIN}
            variant={"outlined"}
            sx={{ my: 2, display: { xs: 'none', md: 'block' } }}
          >
            {`Publish a Ride`}
          </Button>

          <Box
            display={"flex"}
            alignItems={"center"}
            columnGap={{ xs: 0.3, sm: 1, md: 1.5 }}
            sx={{ ml: 2 }}
          >
            <ThemeModeSwitch />
            <AccountMenu>
              {!user ? guestMenuItems : userMenuItems}
            </AccountMenu>
          </Box>
        </Toolbar>
      </>
    </RootStyle>
  );
}
