import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/agreementTypes";

export function getAgreements() {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_AGREEMENTS_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/agreements`);
      dispatch({
        type: types.GET_AGREEMENTS_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_AGREEMENTS_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getAgreement(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_AGREEMENT_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/agreements/${id}`);
      dispatch({
        type: types.GET_AGREEMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_AGREEMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createAgreement(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_AGREEMENT_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/agreements`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_AGREEMENT_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Agreement created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_AGREEMENT_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
