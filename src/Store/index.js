
import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer
} from './slices';
import middleware from "./middlewares";



/* Configure the Redux Store using REDUCERS & MIDDLEWARES */
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware
});



export default store;
