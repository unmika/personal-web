import {
  GET_LIST_PERSONALS,
  ADD_PERSONAL,
  EDIT_PERSONAL,
  DELETE_PERSONAL
} from "../actions/types";

export default function(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_PERSONALS:
      return payload || [];

    case ADD_PERSONAL:
      const values = [...state.slice(0, 0), payload, ...state.slice(0)];
      localStorage.setItem("myData", JSON.stringify(values));
      return values;

    case EDIT_PERSONAL:
      const updateState = [...state];
      var foundIndex = updateState.findIndex(item => item.id === payload.id);
      updateState[foundIndex] = payload;
      localStorage.setItem("myData", JSON.stringify(updateState));
      return updateState;

    case DELETE_PERSONAL:
      const newState = state.filter(item => item.id !== payload);
      localStorage.setItem("myData", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
}
