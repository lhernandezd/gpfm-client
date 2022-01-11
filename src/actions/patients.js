import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/patientTypes";

export function getPatients(params) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_PATIENTS_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/patients`, { params });
      dispatch({
        type: types.GET_PATIENTS_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_PATIENTS_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getPatient(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_PATIENT_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/patients/${id}`);
      dispatch({
        type: types.GET_PATIENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_PATIENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function updatePatient(id, values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_PATIENT_REQUEST,
      });
      const response = await http.put(`${process.env.REACT_APP_API_URL}/patients/${id}`, {
        ...values,
      });
      dispatch({
        type: types.UPDATE_PATIENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Patient updated"));
    } catch (e) {
      dispatch({
        type: types.UPDATE_PATIENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createPatient(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_PATIENT_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/patients`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_PATIENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Patient created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_PATIENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
