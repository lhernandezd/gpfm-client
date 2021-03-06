import http from "../utils/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/historyTypes";

export function getHistories(params) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_HISTORIES_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/histories`, { params });
      dispatch({
        type: types.GET_HISTORIES_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_HISTORIES_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getHistory(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_HISTORY_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/histories/${id}`);
      dispatch({
        type: types.GET_HISTORY_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_HISTORY_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createHistory(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_HISTORY_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/histories`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_HISTORY_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "History created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_HISTORY_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function updateHistory(id, values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_HISTORY_REQUEST,
      });
      const response = await http.put(`${process.env.REACT_APP_API_URL}/histories/${id}`, {
        ...values,
      });
      dispatch({
        type: types.UPDATE_HISTORY_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "History updated"));
    } catch (e) {
      dispatch({
        type: types.UPDATE_HISTORY_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
