
import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer, uiReducer
} from './slices';
import middleware from "./middlewares";



/* Configure the Redux Store using REDUCERS & MIDDLEWARES */
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer
  },
  middleware
});



export default store;
