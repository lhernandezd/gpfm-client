import * as types from "./constants/snackbarTypes";

export const showSnackbar = (severity, message) => (dispatch) => {
  dispatch({ type: types.SNACKBAR_OPEN, payload: { severity, message } });
};

export const clearSnackbar = () => (dispatch) => {
  dispatch({ type: types.SNACKBAR_CLEAR });
};
