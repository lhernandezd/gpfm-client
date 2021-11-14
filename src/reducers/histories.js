import * as types from "../actions/constants/historyTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
  history: {},
};

export default function historyReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_HISTORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_HISTORIES_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_HISTORIES_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        meta: {},
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.GET_HISTORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_HISTORY_SUCCESS: {
      return {
        ...state,
        history: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_HISTORY_FAILURE: {
      return {
        ...state,
        history: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.UPDATE_HISTORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.UPDATE_HISTORY_SUCCESS: {
      return {
        ...state,
        history: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.UPDATE_HISTORY_FAILURE: {
      return {
        ...state,
        history: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
