import * as types from "../actions/constants/codeTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
};

export default function codeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CODES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_CODES_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_CODES_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        meta: {},
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
