import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

//combine all reducers in this file

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
