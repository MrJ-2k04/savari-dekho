import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    USER: null,
    AUTH_READY: true,
    IS_LOGGED_IN: true,
    ROLE: "",
  },
  reducers: {
    login: (state, action) => {
      return {...state, IS_LOGGED_IN: true, USER: action.payload};
    },
    logout: (state, action) => {
      return {...state, IS_LOGGED_IN: false, USER: null};
    }
  },
})


export const authActions = authSlice.actions;

export default authSlice.reducer;