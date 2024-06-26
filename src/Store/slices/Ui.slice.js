import { createSlice } from '@reduxjs/toolkit'
import { THEME } from 'Store/constants';

const defaultTheme = localStorage.getItem('theme-mode') || (window.matchMedia("(prefers-color-scheme:dark)").matches ? THEME.DARK : THEME.LIGHT);

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        themeMode: defaultTheme
    },
    reducers: {
        toggleThemeMode: (state, action) => {
            const updatedTheme = state.themeMode === THEME.DARK ? THEME.LIGHT : THEME.DARK;
            localStorage.setItem('theme-mode', updatedTheme);
            return { ...state, themeMode: updatedTheme };
        },
        // setDarkTheme: (state, action) => {
        //     state.themeMode = THEME.DARK;
        //     return state;
        // },
        // setLightTheme: (state, action) => {
        //     state.themeMode = THEME.LIGHT;
        //     return state;
        // },
        // setTheme: (state, action)=>{
        //     state.themeMode = action.payload;
        //     return state;
        // }
    },
})


export const uiActions = uiSlice.actions;

export default uiSlice.reducer;