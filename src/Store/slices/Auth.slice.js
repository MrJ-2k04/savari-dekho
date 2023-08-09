import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    USER: null,
    AUTH_READY: true,
  },
  reducers: {
    login: (state, action) => {
      return { ...state, USER: action.payload };
    },
    logout: (state, action) => {
      return { ...state, USER: null };
    }
  },
})


export const authActions = authSlice.actions;

export default authSlice.reducer;