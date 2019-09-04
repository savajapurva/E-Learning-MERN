import { GET_ERRORS } from "../actions/types";

//Initial state for auth reducer
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
