import {
  AccountCircle,
  AdminPanelSettings,
  Call,
  DarkMode,
  EditNote,
  Email,
  Instagram,
  LightMode,
  Menu
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  alpha,
  styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DRAWER_WIDTH, SITE_TITLE, THEME } from "Store/constants";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "Assets/brand/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "Store/slices";


// Temp Stuff
const LINK_CONTACT = "";
const LINK_EMAIL = "";
const LINK_INSTAGRAM = "";
const ROUTE_ADMIN = "";
const ROUTE_PROFILE_LOGIN = "";
const ROUTE_REGISTRATION = "";



const drawerWidth = 240;
const navItems = [
  { label: "Search", path: ROUTE_REGISTRATION, icon: EditNote },
  { label: "View Profile", path: ROUTE_PROFILE_LOGIN, icon: AccountCircle },
  { label: "Admin Login", path: ROUTE_ADMIN, icon: AdminPanelSettings },
];

// const iconItems = [
//   { icon: DarkMode, path: LINK_INSTAGRAM },
//   { icon: LightMode, path: "" },
//   // { icon: Facebook, path: LINK_FACEBOOK },
//   // { icon: Email, path: LINK_EMAIL },
//   // { icon: Call, path: LINK_CONTACT },
// ];

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const modeIcon = useSelector(state => state.ui.themeMode === THEME.DARK ? <LightMode /> : <DarkMode />);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Button LinkComponent={Link}
        to={"/"}
        sx={{ my: 2 }}
        color="inherit"
      >{SITE_TITLE}
      </Button>
      <Divider color="white" sx={{ width: '90%', mx: "auto" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <ListItem>
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-evenly"}
            sx={{ ml: "3px" }}
          >
            {iconItems.map((item, idx) => (
              <IconButton
                // size="large"
                LinkComponent={Link}
                to={item.path}
                target="_blank"
                rel="noopener noreferrer"
                edge="end"
                color="inherit"
                key={idx}
                sx={{ mx: 0.5 }}
              >
                <item.icon />
              </IconButton>
            ))}
          </Stack>
        </ListItem> */}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <RootStyle
      // variant="elevation"
      // color="transparent"
    >
      <>
        <Toolbar>
          <Logo height={"3rem"} width={"6rem"} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={ROUTE_REGISTRATION}
            sx={{
              mr: 2,
              fontWeight: 700,
              fontSize: { xs: "medium", sm: "large", md: "larger" },
              letterSpacing: { xs: ".1rem", sm: ".2rem", md: ".3rem" },
              textDecoration: "none",
              color: "inherit",
            }}
            flexGrow={1}
          >
            {SITE_TITLE}
          </Typography>

          {/* {iconItems.map((item, idx) => ( */}
          <IconButton
            // size="large"
            edge="end"
            // color="inherit"
            // key={idx}
            sx={{ mx: 0.5 }}
            onClick={e => dispatch(uiActions.toggleThemeMode())}
          >
            {modeIcon}
          </IconButton>
          {/* ))} */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
              <Button
                className="hover-underline-animation1"
                key={item.label}
                component={Link}
                variant=""
                to={item.path}
                sx={{ my: 2, display: "block" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </>
      {/* Sidebar for Smaller Screens */}
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // background: "linear-gradient(135deg, #2a374b, #27374D)"
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </RootStyle>
  );
}
