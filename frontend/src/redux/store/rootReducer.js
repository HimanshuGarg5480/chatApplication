import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import showProfileReducer from "../features/user/ProfileSlice";
import uiReducer from "../features/uiSlice/UiSlice";

const rootReducer = combineReducers({
  user: userReducer,
  profileVisibility: showProfileReducer,
  ui: uiReducer
  // ... other reducers
});

export default rootReducer;
