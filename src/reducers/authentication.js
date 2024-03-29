import { omit, get } from "lodash";
import { setAccessToken, removeAccessToken } from "../utils/api/auth";
import * as types from "../actions/constants/authenticationTypes";

const initialState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  error: false,
};

export default function authenticationReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.LOGIN_USER_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
        statusText: null,
      };
    }

    case types.LOGIN_USER_SUCCESS: {
      setAccessToken(payload.accessToken);
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        currentUser: omit(payload.data, ["accessToken"]),
        error: false,
        statusText: "You have been successfully logged in.",
        token: payload.accessToken,
      };
    }

    case types.LOGIN_USER_FAILURE: {
      removeAccessToken();
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        error: true,
        statusText: `Error ${get(payload, "status", "No status")}: ${get(payload, "data.message")}`,
      };
    }

    case types.LOGOUT_USER: {
      removeAccessToken();
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        statusText: "You have been successfully logged out.",
        token: null,
      };
    }

    default:
      return state;
  }
}
