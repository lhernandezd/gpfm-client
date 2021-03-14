import http from "../utils/http";
import { showSnackbar } from "./snackbar";
import * as types from "./constants/entityTypes";

export function getEntities() {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_ENTITIES_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/entities`);
      dispatch({
        type: types.GET_ENTITIES_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
          meta: response.data.meta,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_ENTITIES_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function getEntity(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_ENTITY_REQUEST,
      });
      const response = await http.get(`${process.env.REACT_APP_API_URL}/entities/${id}`);
      dispatch({
        type: types.GET_ENTITY_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: types.GET_ENTITY_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}

export function createEntity(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_ENTITY_REQUEST,
      });
      const response = await http.post(`${process.env.REACT_APP_API_URL}/entities`, {
        ...values,
      });
      dispatch({
        type: types.CREATE_ENTITY_SUCCESS,
        payload: {
          ...response,
          data: response.data.data,
        },
      });
      dispatch(showSnackbar("success", "Entity created"));
    } catch (e) {
      dispatch({
        type: types.CREATE_ENTITY_FAILURE,
        payload: e.response,
      });
      dispatch(showSnackbar("error", e.response.data.message));
    }
  };
}
