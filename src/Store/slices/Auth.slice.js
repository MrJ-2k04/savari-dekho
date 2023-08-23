import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    authReady: true,
  },
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      return { ...state, accessToken, refreshToken };
    },
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    logout: (state, action) => {
      return { ...state, USER: null };
    }
  },
})


export const authActions = authSlice.actions;

export default authSlice.reducer;