import {
  AccountBalance,
  AccountBalanceWallet,
  AccountCircle,
  Login,
  Logout,
  PersonAdd,
  Settings,
  SwapHoriz,
  Wallet
} from "@mui/icons-material";
import {
  Avatar,
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
import { ROLES, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import Logo from "Components/Logo";
import AccountMenu from "Components/Other/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


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
  const [user, setUser] = useState({ role: ROLES.USER });

  const toggleRole = () => { setUser({ ...user, role: user.role === ROLES.RIDER ? ROLES.USER : ROLES.RIDER }); console.log("Switched"); }

  const logout = () => setUser({});

  const userMenuItems = <>
    <MenuItem component={Link} to={"/profile"}>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      Profile
    </MenuItem>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        <AccountBalanceWallet />
      </ListItemIcon>
      Wallet
    </MenuItem>
    <MenuItem component={Link} to={"/rides"}>
      Your Rides
    </MenuItem>
    <Divider />
    <MenuItem onClick={toggleRole}>
      <ListItemIcon>
        <SwapHoriz />
      </ListItemIcon>
      Switch to Rider
    </MenuItem>
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      Logout
    </MenuItem>
  </>;

  const riderMenuItems = <>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      Profile
    </MenuItem>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        <AccountBalanceWallet />
      </ListItemIcon>
      Wallet
    </MenuItem>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        
      </ListItemIcon>
      Your Rides
    </MenuItem>
    <Divider />
    <MenuItem onClick={toggleRole}>
      <ListItemIcon>
        <SwapHoriz />
      </ListItemIcon>
      Switch to User
    </MenuItem>
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      Logout
    </MenuItem>
  </>;

  const guestMenuItems = <>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        <Login />
      </ListItemIcon>
      Login
    </MenuItem>
    <MenuItem onClick={e => { }}>
      <ListItemIcon>
        <PersonAdd />
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
          <Typography
            variant="h3"
            noWrap
            component={Link}
            to={"/register"}
            sx={{
              mr: 2,
              fontWeight: 500,
              // fontSize: { xs: "medium", sm: "large", md: "larger" },
              // letterSpacing: { xs: ".1rem", sm: ".2rem", md: ".3rem" },
              textDecoration: "none",
              color: "inherit",
            }}
            flexGrow={1}
          >
            {SITE_TITLE}
          </Typography>


          {user.role &&
            <Button
              // className="hover-underline-animation1"
              onClick={toggleRole}
              variant={"outlined"}
              sx={{ my: 2, display: { xs: 'none', md: 'block' } }}
            >
              {user.role === ROLES.USER && `Become a Rider`}
              {user.role === ROLES.RIDER && `Become a User`}
            </Button>
          }
          <Box
            display={"flex"}
            alignItems={"center"}
            columnGap={{ xs: 0.3, sm: 1, md: 1.5 }}
            sx={{ ml: 2 }}
          >
            <ThemeModeSwitch />
            <AccountMenu>
              {!user.role ? guestMenuItems :
                <>
                  {user.role === ROLES.RIDER && riderMenuItems}
                  {user.role === ROLES.USER && userMenuItems}
                </>
              }
            </AccountMenu>
          </Box>
        </Toolbar>
      </>
    </RootStyle>
  );
}
