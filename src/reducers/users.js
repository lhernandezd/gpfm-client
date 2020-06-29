import * as types from "../actions/constants/userTypes";

const initialState = {
  data: [],
  isFetching: false,
  error: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    }

    case types.GET_USERS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isFetching: false,
        error: false,
      };
    }

    case types.GET_USERS_FAILURE: {
      return {
        ...state,
        data: [],
        isFetching: false,
        error: true,
      };
    }

    default:
      return state;
  }
}
