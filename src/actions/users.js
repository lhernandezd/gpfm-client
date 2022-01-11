import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/userTypes";

export function getUsers() {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_USERS_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/users`);
      dispatch({
        type: types.GET_USERS_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_USERS_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getUser(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_USER_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
      dispatch({
        type: types.GET_USER_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_USER_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function updateUser(id, values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_USER_REQUEST,
      });
      const response = await http.put(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        ...values,
      });
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "User updated"));
    } catch (e) {
      dispatch({
        type: types.UPDATE_USER_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createUser(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_USER_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/users`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "User created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_USER_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
