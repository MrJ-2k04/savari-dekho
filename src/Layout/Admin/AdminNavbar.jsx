import {
  Menu
} from "@mui/icons-material";
import {
  Container,
  IconButton,
  Stack,
  alpha,
  styled
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { DRAWER_WIDTH } from "Store/constants";


import { MHidden } from "Components/@Material-Extend";
import LogoWithText from "Components/Common/LogoWithText";
import ThemeModeSwitch from "Components/Common/ThemeModeSwitch";
import AccountMenu from "Components/Other/AccountMenu";


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
  return (
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
            <AccountMenu />
          </Stack>
        </Toolbar >
      </Container >
    </RootStyle >
  );
}
