import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    authReady: false,
  },
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      return { ...state, accessToken, refreshToken };
    },
    setUser: (state, action) => {
      return { ...state, user: action.payload, authReady: true };
    },
    logout: (state, action) => {
      return { ...state, user: null, accessToken: null, refreshToken: null };
    },
    setAuthReadyStatus: (state, action) => {
      return { ...state, authReady: action.payload }
    },
  },
})


export const authActions = authSlice.actions;

export default authSlice.reducer;