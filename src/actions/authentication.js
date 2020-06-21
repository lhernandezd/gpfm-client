import http from "../utils/http";
import * as types from "./constants/authenticationTypes";

export function logout() {
  return {
    type: types.LOGOUT_USER,
  };
}

export function login({ email, password }) {
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
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.response,
      });
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