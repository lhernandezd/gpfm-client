import * as types from "../actions/constants/snackbarTypes";

const initialState = {
  severity: "info",
  open: false,
  message: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SNACKBAR_OPEN:
      return {
        ...state,
        severity: payload.severity,
        open: true,
        message: payload.message,
      };
    case types.SNACKBAR_CLEAR:
      return {
        ...state,
        open: false,
        message: "",
      };
    default:
      return state;
  }
}