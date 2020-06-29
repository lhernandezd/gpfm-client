import http from "../utils/http";
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
