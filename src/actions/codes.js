import http from "../utils/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/codeTypes";

export function getCodes(params) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_CODES_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/codes`, { params });
      dispatch({
        type: types.GET_CODES_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_CODES_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
