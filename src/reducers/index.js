import { combineReducers } from "redux";
import authentication from "./authentication";
import snackbar from "./snackbar";
import users from "./users";
import patients from "./patients";
import cities from "./cities";
import histories from "./histories";
import codes from "./codes";
import entities from "./entities";

const reducers = combineReducers({
  authentication,
  snackbar,
  users,
  patients,
  cities,
  histories,
  codes,
  entities,
});

export default reducers;
