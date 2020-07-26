import { combineReducers } from "redux";
import authentication from "./authentication";
import snackbar from "./snackbar";
import users from "./users";
import patients from "./patients";

const reducers = combineReducers({
  authentication,
  snackbar,
  users,
  patients,
});

export default reducers;
