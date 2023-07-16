import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { THEME } from "Store/constants";
import { uiActions } from "Store/slices";
import { useDispatch, useSelector } from "react-redux";

function ThemeModeSwitch({sx}) {

    const dispatch = useDispatch();
    const themeMode = useSelector(state => state.ui.themeMode);
    const modeIcon = themeMode === THEME.DARK ? <LightMode /> : <DarkMode />

    return (
        <IconButton
            color={"primary"}
            sx={{ ...sx }}
            onClick={e => dispatch(uiActions.toggleThemeMode())}
        >
            {modeIcon}
        </IconButton>
    );
}

export default ThemeModeSwitch;