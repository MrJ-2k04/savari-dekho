import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import logoSrc from "Assets/brand/logo.svg";
import logoDarkSrc from "Assets/brand/logoDark.svg";
import { ROUTE_HOME, THEME } from "Store/constants";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Logo({ sx, onClick = null }) {
    const themeMode = useSelector((state) => state.ui.themeMode);
    // const Logo = themeMode === THEME.LIGHT ? logo : logoDark;
    const src = themeMode === THEME.LIGHT ? logoSrc : logoDarkSrc;

    const nav = useNavigate();
    const handleNavigate = () => {
        nav(ROUTE_HOME);
    }

    return (
        <Box
            onClick={onClick || handleNavigate}
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
    )
}
