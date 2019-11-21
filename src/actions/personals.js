import {
  GET_LIST_PERSONALS,
  ADD_PERSONAL,
  EDIT_PERSONAL,
  DELETE_PERSONAL
} from "./types";

export const getListPersonals = () => {
  return dispatch => {
    const values = JSON.parse(localStorage.getItem("myData"));
    dispatch({
      type: GET_LIST_PERSONALS,
      payload: values
    });
  };
};

export const addPersonal = data => {
  return dispatch => {
    dispatch({
      type: ADD_PERSONAL,
      payload: data
    });
  };
};

export const editPersonal = data => {
  return dispatch => {
    dispatch({
      type: EDIT_PERSONAL,
      payload: data
    });
  };
};

export const deletePersonal = personalId => {
  return dispatch => {
    dispatch({
      type: DELETE_PERSONAL,
      payload: personalId
    });
  };
};
