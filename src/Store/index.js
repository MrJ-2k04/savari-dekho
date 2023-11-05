
import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer, mapReducer, uiReducer
} from './slices';
import middleware from "./middlewares";



/* Configure the Redux Store using REDUCERS & MIDDLEWARES */
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    map: mapReducer,
  },
  middleware
});



export default store;
