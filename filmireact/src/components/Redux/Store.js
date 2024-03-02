import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice';

var store = configureStore({
    reducer:{
             auth: authReducer
    }
});
export default store;