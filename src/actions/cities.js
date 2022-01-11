import http from "../utils/api/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/cityTypes";

export function getCities() {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_CITIES_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/cities`);
      dispatch({
        type: types.GET_CITIES_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_CITIES_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
