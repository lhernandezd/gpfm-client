import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/settingTypes";

export function getSettings(params) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_SETTING_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/settings`, { params });
      dispatch({
        type: types.GET_SETTING_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_SETTING_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function updateSetting(id, values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_SETTING_REQUEST,
      });
      const response = await http.put(`${process.env.REACT_APP_API_URL}/settings/${id}`, {
        ...values,
      });
      dispatch({
        type: types.UPDATE_SETTING_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Settings updated"));
    } catch (e) {
      dispatch({
        type: types.UPDATE_SETTING_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
