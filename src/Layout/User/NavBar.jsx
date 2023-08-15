import {
  AccountBalanceWallet,
  AccountCircle,
  Close,
  DirectionsCar,
  Login,
  Logout,
  PersonAdd,
  Route,
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
import Logo from "Components/Common/Logo";
import AccountMenu from "Components/Other/AccountMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "Components/Hooks/useFetch";
import { MHidden } from "Components/@Material-Extend";


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));


export default function NavBar() {

  const user = useSelector(state => state.auth.USER);
  const { logoutUser } = useFetch();

  const userMenuItems = [
    { icon: AccountCircle, label: "Profile", to: ROUTE_PROFILE },
    { icon: AccountBalanceWallet, label: "Wallet", to: ROUTE_WALLET },
    { icon: TimeToLeave, label: "Your Rides", to: ROUTE_RIDES },
    { icon: Logout, label: "Logout", onClick: logoutUser },
  ]

  const guestMenuItems = [
    { icon: Login, label: "Login", to: ROUTE_LOGIN },
    { icon: PersonAdd, label: "Sign up", to: ROUTE_REGISTER },
  ]

  return (
    <RootStyle
    // variant="elevation"
    color="transparent"
    >
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
          to={ROUTE_RIDE_PUBLISH}
          variant={"outlined"}
          sx={{ my: 2, display: { xs: 'none', md: 'block' } }}
        >
          {`Publish a Ride`}
        </Button>

        <Box
          display={"flex"}
          alignItems={"center"}
          columnGap={{ xs: 0.3, sm: 1, md: 1.5 }}
          sx={{ ml: 3 }}
        >
          <ThemeModeSwitch />

          <AccountMenu>
            <MHidden width="mdUp">
              <MenuItem
                component={Link}
                to={ROUTE_RIDE_PUBLISH}
              >
                <ListItemIcon><Route fontSize="small" /></ListItemIcon>
                {`Publish a Ride`}
              </MenuItem>
              <Divider />
            </MHidden>
            {(user ? userMenuItems : guestMenuItems).map(item => (
              <MenuItem
                key={item.label}
                component={Boolean(item.to) ? Link : undefined}
                to={item.to}
                onClick={item.onClick}
              >
                <ListItemIcon>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                {item.label}
              </MenuItem>
            ))}
          </AccountMenu>
        </Box>
      </Toolbar>
    </RootStyle>
  );
}
