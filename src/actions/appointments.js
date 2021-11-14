import http from "../utils/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/appointmentTypes";

export function getAppointments(params) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_APPOINTMENTS_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/appointments`, { params });
      dispatch({
        type: types.GET_APPOINTMENTS_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_APPOINTMENTS_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getAppointment(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_APPOINTMENT_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/appointments/${id}`);
      dispatch({
        type: types.GET_APPOINTMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_APPOINTMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createAppointment(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_APPOINTMENT_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/appointments`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_APPOINTMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Appointment created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_APPOINTMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function updateAppointment(id, values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_APPOINTMENT_REQUEST,
      });
      const response = await http.put(`${process.env.REACT_APP_API_URL}/appointments/${id}`, {
        ...values,
      });
      dispatch({
        type: types.UPDATE_APPOINTMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Appointment updated"));
    } catch (e) {
      dispatch({
        type: types.UPDATE_APPOINTMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function deleteAppointment(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.DELETE_APPOINTMENT_REQUEST,
      });
      const response = await http.delete(`${process.env.REACT_APP_API_URL}/appointments/${id}`);
      dispatch({
        type: types.DELETE_APPOINTMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Appointment deleted"));
    } catch (e) {
      dispatch({
        type: types.DELETE_APPOINTMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
