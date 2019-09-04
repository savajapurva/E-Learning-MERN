import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../../../validation/is-empty";
//Initial state for auth reducer
const initialState = {
  isAuthenticated: false,
  users: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: action.payload
      };
    default:
      return state;
  }
}
