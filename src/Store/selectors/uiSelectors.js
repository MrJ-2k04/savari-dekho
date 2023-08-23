

import { createSelector } from "@reduxjs/toolkit";
import { THEME } from "Store/constants";



// ========================================== SELECTORS ==========================================
const selectUiState = (state) => state.ui;



export const selectThemeMode = createSelector(
    selectUiState,
    (ui) => ui.themeMode,
)

export const selectIsDarkMode = createSelector(
    selectThemeMode,
    (theme) => theme === THEME.DARK,
);