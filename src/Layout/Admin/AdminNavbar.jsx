import {
  AccountBalanceWallet,
  AccountCircle,
  Login,
  Logout,
  Menu,
  PersonAdd,
  Route,
  Search,
  TimeToLeave
} from "@mui/icons-material";
import {
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Switch,
  alpha,
  styled
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DRAWER_WIDTH, ROUTE_ADMIN_PROFILE, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RIDE_HISTORY, ROUTE_RIDE_PUBLISH, ROUTE_SEARCH, ROUTE_WALLET, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import { MHidden } from "Components/@Material-Extend";
import Logo from "Components/Common/Logo";
import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import useFetch from "Components/Hooks/useFetch";
import AccountMenu from "Components/Other/AccountMenu";
import { selectIsAuthenticated } from "Store/selectors";
import { useSelector } from "react-redux";
import LogoWithText from "Components/Common/LogoWithText";


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

export default function AdminNavbar({ onOpenSidebar }) {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { logoutUser } = useFetch();

  const userMenuItems = [
    { icon: AccountCircle, label: "Profile", to: ROUTE_PROFILE_DASHBOARD },
    { icon: AccountBalanceWallet, label: "Wallet", to: ROUTE_WALLET },
    { icon: TimeToLeave, label: "Your Rides", to: ROUTE_RIDE_HISTORY },
    { icon: Logout, label: "Logout", onClick: logoutUser },
  ]

  const guestMenuItems = [
    { icon: Login, label: "Login", to: ROUTE_LOGIN },
    { icon: PersonAdd, label: "Sign up", to: ROUTE_REGISTER },
  ]

  const handleLogout = () => {
    console.log("logout");
  }

  return (
    // <RootStyle
    //   // variant="elevation"
    //   color="transparent"
    // >
    //   <Toolbar>
    //     <Logo />
    //     <Box flexGrow={1}>
    //       <Typography
    //         variant="h3"
    //         noWrap
    //         component={Link}
    //         to={ROUTE_HOME}
    //         sx={{
    //           mr: 2,
    //           fontWeight: 500,
    //           // fontSize: { xs: "medium", sm: "large", md: "larger" },
    //           // letterSpacing: { xs: ".1rem", sm: ".2rem", md: ".3rem" },
    //           textDecoration: "none",
    //           color: "inherit",
    //         }}
    //       >
    //         {SITE_TITLE}
    //       </Typography>
    //     </Box>



    //     <Box
    //       display={"flex"}
    //       alignItems={"center"}
    //       columnGap={1}
    //       sx={{ ml: 3 }}
    //     >
    //       <Stack direction={'row'} display={{ xs: 'none', md: 'block' }} spacing={2} px={1}>
    //         <Button
    //           // className="hover-underline-animation1"
    //           // onClick={toggleRole}
    //           startIcon={<Search />}
    //           LinkComponent={Link}
    //           to={ROUTE_SEARCH}
    //           variant={"text"}
    //         >
    //           {`Search`}
    //         </Button>
    //         <Button
    //           // className="hover-underline-animation1"
    //           // onClick={toggleRole}
    //           startIcon={<Route />}
    //           LinkComponent={Link}
    //           to={ROUTE_RIDE_PUBLISH}
    //           variant={"text"}
    //         >
    //           {`Publish a Ride`}
    //         </Button>
    //       </Stack>

    //       <ThemeModeSwitch />

    //       <AccountMenu>
    //         <MHidden width="mdUp">
    //           <MenuItem
    //             component={Link}
    //             to={ROUTE_SEARCH}
    //           >
    //             <ListItemIcon><Search fontSize="small" /></ListItemIcon>
    //             {`Search a Ride`}
    //           </MenuItem>
    //           <MenuItem
    //             component={Link}
    //             to={ROUTE_RIDE_PUBLISH}
    //           >
    //             <ListItemIcon><Route fontSize="small" /></ListItemIcon>
    //             {`Publish a Ride`}
    //           </MenuItem>
    //           <Divider />
    //         </MHidden>
    //         {(isAuthenticated ? userMenuItems : guestMenuItems).map(item => (
    //           <MenuItem
    //             key={item.label}
    //             component={Boolean(item.to) ? Link : undefined}
    //             to={item.to}
    //             onClick={item.onClick}
    //           >
    //             <ListItemIcon>
    //               <item.icon fontSize="small" />
    //             </ListItemIcon>
    //             {item.label}
    //           </MenuItem>
    //         ))}
    //       </AccountMenu>
    //     </Box>
    //   </Toolbar>
    // </RootStyle>
    <RootStyle>
      <Container disableGutters>
        <Toolbar>
          <MHidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1 }}>
              <Menu color="primary" />
            </IconButton>
            <LogoWithText />
          </MHidden>
          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <ThemeModeSwitch />
            <AccountMenu>
              <MHidden width="mdUp">
              </MHidden>
              <MenuItem
                component={Link}
                to={ROUTE_ADMIN_PROFILE}
              >
                <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                {`Profile`}
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
              >
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                {`Logout`}
              </MenuItem>
              <Box sx={{ p: 2, pt: 1.5 }}>
                <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
              {/* {(isAuthenticated ? userMenuItems : guestMenuItems).map(item => (
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
              ))} */}
            </AccountMenu>
          </Stack>
        </Toolbar >
      </Container >
    </RootStyle >
  );
}
