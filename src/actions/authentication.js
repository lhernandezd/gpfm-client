import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/authenticationTypes";

export function logout() {
  return {
    type: types.LOGOUT_USER,
  };
}

export function login({ email, password }, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.LOGIN_USER_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        email, password,
      });
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: {
          ...response,
          accessToken: response.data.accessToken,
        },
      });
      history.push("/home");
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function loginUserSuccess(accessToken) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.LOGIN_USER_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/auth/signintoken`, {
        token: accessToken,
      });
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: {
          data: response.data,
          accessToken,
        },
      });
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.response,
      });
    }
  };
}

export function recoverAccount({ email }, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.RECOVER_PASSWORD_REQUEST,
      });
      await http.post(`${process.env.REACT_APP_API_URL}/auth/recover`, {
        email,
      });
      dispatch({
        type: types.RECOVER_PASSWORD_SUCCESS,
      });
      dispatch(showSnackbar("success", "Recovery email sent"));
      history.push("/login");
    } catch (e) {
      dispatch({
        type: types.RECOVER_PASSWORD_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function resetPassword({ password, token }, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.RESET_PASSWORD_REQUEST,
      });
      await http.post(`${process.env.REACT_APP_API_URL}/auth/reset/${token}`, {
        password,
      });
      dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
      });
      dispatch(showSnackbar("success", "Password updated!"));
      history.push("/login");
    } catch (e) {
      dispatch({
        type: types.RESET_PASSWORD_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
