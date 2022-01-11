import * as types from "../actions/constants/settingTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
};

export default function settingReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.GET_SETTING_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_SETTING_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_SETTING_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.UPDATE_SETTING_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.UPDATE_SETTING_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.UPDATE_SETTING_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
