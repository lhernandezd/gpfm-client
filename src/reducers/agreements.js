import * as types from "../actions/constants/agreementTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
  agreement: {},
};

export default function agreementReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.GET_AGREEMENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_AGREEMENTS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_AGREEMENTS_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        meta: {},
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.GET_AGREEMENT_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_AGREEMENT_SUCCESS: {
      return {
        ...state,
        agreement: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_AGREEMENT_FAILURE: {
      return {
        ...state,
        agreement: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
