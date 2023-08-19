import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// import { ReactComponent as logo } from "Assets/brand/logo.svg";
// import { ReactComponent as logoDark } from "Assets/brand/logoDark.svg";
import logoSrc from "Assets/brand/logo.svg";
import logoDarkSrc from "Assets/brand/logoDark.svg";
import { ROUTE_HOME, SITE_TITLE, THEME } from "Store/constants";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function LogoWithText({ sx, onClick }) {
    const themeMode = useSelector((state) => state.ui.themeMode);
    // const Logo = themeMode === THEME.LIGHT ? logo : logoDark;
    const src = themeMode === THEME.LIGHT ? logoSrc : logoDarkSrc;

    return (<Stack
        direction={'row'}
        alignItems={'center'}
        component={Link}
        to={ROUTE_HOME}
        sx={{
            textDecoration: "none",
            color: "inherit",
        }}>
        <Box
            onClick={onClick}
            component={"img"}
            src={src}
            sx={{
                height: "auto",
                width: "auto",
                cursor: "pointer",
                position: "relative",
                maxWidth: { xs: 140, sm: 160, md: 180, lg: 221 },
                maxHeight: { xs: 40, md: 60 },
                ...sx,
            }}>
        </Box>
        <Box flexGrow={1}>
            <Typography
                variant="h3"
                noWrap
                // component={Link}
                // to={ROUTE_HOME}
                sx={{
                    mr: 2,
                    fontWeight: 500
                }}
            >
                {SITE_TITLE}
            </Typography>
        </Box>
    </Stack>
    )
}
