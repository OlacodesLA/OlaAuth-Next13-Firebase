import { combineReducers } from "@reduxjs/toolkit";
import ProfileReducer from "./slice/profileSlice";

const CombinedReducers = combineReducers({
  profile: ProfileReducer,
});

export default CombinedReducers;
