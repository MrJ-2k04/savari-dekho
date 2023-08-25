import {
  AccountBalanceWallet,
  AccountCircle,
  Login,
  Logout,
  PersonAdd,
  Route,
  Search,
  TimeToLeave
} from "@mui/icons-material";
import {
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
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PROFILE_DASHBOARD, ROUTE_REGISTER, ROUTE_RIDE_HISTORY, ROUTE_RIDE_PUBLISH, ROUTE_SEARCH, ROUTE_WALLET, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import { MHidden } from "Components/@Material-Extend";
import Logo from "Components/Common/Logo";
import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import useFetch from "Components/Hooks/useFetch";
import AccountMenu from "Components/Other/AccountMenu";
import { selectIsAuthenticated } from "Store/selectors";
import { useSelector } from "react-redux";


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

export default function NavBar() {

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



        <Box
          display={"flex"}
          alignItems={"center"}
          columnGap={1}
          sx={{ ml: 3 }}
        >
          <Stack direction={'row'} display={{ xs: 'none', md: 'block' }} spacing={2} px={1}>
            <Button
              // className="hover-underline-animation1"
              // onClick={toggleRole}
              startIcon={<Search />}
              LinkComponent={Link}
              to={ROUTE_SEARCH}
              variant={"text"}
            >
              {`Search`}
            </Button>
            <Button
              // className="hover-underline-animation1"
              // onClick={toggleRole}
              startIcon={<Route />}
              LinkComponent={Link}
              to={ROUTE_RIDE_PUBLISH}
              variant={"text"}
            >
              {`Publish a Ride`}
            </Button>
          </Stack>

          <ThemeModeSwitch />

          <AccountMenu>
            <MHidden width="mdUp">
              <MenuItem
                component={Link}
                to={ROUTE_SEARCH}
              >
                <ListItemIcon><Search fontSize="small" /></ListItemIcon>
                {`Search a Ride`}
              </MenuItem>
              <MenuItem
                component={Link}
                to={ROUTE_RIDE_PUBLISH}
              >
                <ListItemIcon><Route fontSize="small" /></ListItemIcon>
                {`Publish a Ride`}
              </MenuItem>
              <Divider />
            </MHidden>
            {(isAuthenticated ? userMenuItems : guestMenuItems).map(item => (
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
