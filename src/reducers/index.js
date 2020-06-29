import { combineReducers } from "redux";
import authentication from "./authentication";
import snackbar from "./snackbar";
import users from "./users";

const reducers = combineReducers({
  authentication,
  snackbar,
  users,
});

export default reducers;
