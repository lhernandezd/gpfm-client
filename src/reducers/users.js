import * as types from "../actions/constants/userTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
  user: {},
};

export default function userReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.GET_USERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_USERS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_USERS_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        meta: {},
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.GET_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_USER_FAILURE: {
      return {
        ...state,
        user: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.UPDATE_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.UPDATE_USER_FAILURE: {
      return {
        ...state,
        user: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
