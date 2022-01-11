import * as types from "../actions/constants/appointmentTypes";

const initialState = {
  data: [],
  isFetching: false,
  meta: {},
  statusText: null,
  error: false,
  appointment: {},
};

export default function appointmentRedcuer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.GET_APPOINTMENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_APPOINTMENTS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_APPOINTMENTS_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
        meta: {},
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    case types.GET_APPOINTMENT_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
        statusText: null,
        meta: {},
      };
    }

    case types.GET_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        appointment: payload.data,
        isFetching: false,
        error: false,
        statusText: "Success",
      };
    }

    case types.GET_APPOINTMENT_FAILURE: {
      return {
        ...state,
        appointment: {},
        isFetching: false,
        error: true,
        statusText: `Error ${payload.status}: ${payload.data.message}`,
      };
    }

    default:
      return state;
  }
}
