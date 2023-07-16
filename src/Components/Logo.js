import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// import { ReactComponent as logo } from "Assets/brand/logo.svg";
// import { ReactComponent as logoDark } from "Assets/brand/logoDark.svg";
import logoSrc from "Assets/brand/logo.svg";
import logoDarkSrc from "Assets/brand/logoDark.svg";
import { THEME } from "Store/constants";

// ----------------------------------------------------------------------

export default function Logo({ sx, onClick }) {
    const themeMode = useSelector(
        (state) => state.ui.themeMode || localStorage.getItem("theme-mode")
    );
    // const Logo = themeMode === THEME.LIGHT ? logo : logoDark;
    const src = themeMode === THEME.LIGHT ? logoSrc : logoDarkSrc;

    return (
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
    )
}
