import { createSlice } from '@reduxjs/toolkit'
import { THEME } from 'Store/constants';

const defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? THEME.DARK : THEME.LIGHT;

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        themeMode: defaultTheme
    },
    reducers: {
        toggleThemeMode: (state, action) => {
            const updatedTheme = state.themeMode === THEME.DARK ? THEME.LIGHT : THEME.DARK;
            return { ...state, themeMode: updatedTheme };
        },
    },
})


export const uiActions = uiSlice.actions;

export default uiSlice.reducer;