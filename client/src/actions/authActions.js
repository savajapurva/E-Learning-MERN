import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//registerUser action creator takes data and dispatch action to reducer along with payload
export const registerUser = (userData, history) => dispatch => {
  //here we are dealing with asyncnorous data while fetching from backend we need to wait for /////response then we can dispatch action and payload to the reducer.
  //so we need to use thunk middleware

  axios
    .post("http://localhost:5000/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        //we are just not returning we are dispatching using redux-thunk
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get user token , //loginUser action creator
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/users/login", userData)
    .then(res => {
     // console.log(res);
      //save token to local storage
      const { token } = res.data; 
      //set token to local storage
      localStorage.setItem("jwtToken", token);
   //   localStorage.setItem("username", res.data.first_name.charAt(0).toUpperCase() + res.data.first_name.slice(1)+" "+res.data.last_name.charAt(0).toUpperCase() + res.data.last_name.slice(1));
      
      //set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loggid in user , //setCurrentUser action creator
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded //actual user with all info
  };
};

//Log user out , //logoutUser action creator
export const logoutUser = () => dispatch => {
  //Remove token from lc
  localStorage.removeItem("jwtToken");
  //Remove auth header for fututre requests
  setAuthToken(false);
  //set current user to {} which will
  dispatch(setCurrentUser({}));
};
