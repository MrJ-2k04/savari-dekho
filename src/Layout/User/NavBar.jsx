import {
  Route,
  Search
} from "@mui/icons-material";
import {
  ListItemIcon,
  MenuItem,
  Stack,
  alpha,
  styled
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ROUTE_HOME, ROUTE_RIDE_PUBLISH, ROUTE_SEARCH, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import { MHidden } from "Components/@Material-Extend";
import Logo from "Components/Common/Logo";
import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import AccountMenu from "Components/Other/AccountMenu";


const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

export default function NavBar() {
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
              // state={{ redirectUrl: ROUTE_RIDE_PUBLISH }}
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
            </MHidden>
          </AccountMenu>
        </Box>
      </Toolbar>
    </RootStyle>
  );
}
