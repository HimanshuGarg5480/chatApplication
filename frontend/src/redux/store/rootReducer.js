import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import showProfileReducer from "../features/user/ProfileSlice";

const rootReducer = combineReducers({
  user: userReducer,
  profileVisibility: showProfileReducer,
  // ... other reducers
});

export default rootReducer;
