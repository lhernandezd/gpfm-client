import { combineReducers } from "redux";
import authentication from "./authentication";
import snackbar from "./snackbar";
import users from "./users";
import patients from "./patients";
import cities from "./cities";

const reducers = combineReducers({
  authentication,
  snackbar,
  users,
  patients,
  cities,
});

export default reducers;
