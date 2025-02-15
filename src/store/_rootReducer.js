// store/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import authReducer from "../features/intro/introSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  intro: introReducer,
});

export default rootReducer;
