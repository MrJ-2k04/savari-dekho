import {
  alpha,
  styled
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ROUTE_HOME, SITE_TITLE } from "Store/constants";

import { Link } from "react-router-dom";

import Logo from "Components/Common/Logo";
import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";


const RootStyle = styled(AppBar)(({ theme, type }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  ...(type === "standard" ? {
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  } : {})
}));


export default function MinimalNavbar({ transparent = false }) {

  return (
    <RootStyle
      // variant="elevation"
      color="transparent"
      type={transparent ? "transparent" : "standard"}
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
        <ThemeModeSwitch />
      </Toolbar>
    </RootStyle>
  );
}
