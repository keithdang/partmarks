import { ACCOUNT } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_ACCOUNT = { loggedIn: false };

const account = (state = DEFAULT_ACCOUNT, action) => {
  switch (action.type) {
    case ACCOUNT.FETCH:
      return { ...state, status: fetchStates.fetching };
    case ACCOUNT.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case ACCOUNT.FETCH_SUCCESS:
      console.log("fetch success:", action.payload);
      return {
        ...state,
        status: fetchStates.success,
        message: action.payload.message,
        role: action.payload.role,
        firstName: action.payload.firstName,
        loggedIn: true,
      };
    case ACCOUNT.FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.payload.message,
        firstName: "",
        loggedIn: false,
      };
    case ACCOUNT.FETCH_AUTHENTICATED_SUCCESS:
      console.log("fetch auth:", action.payload);
      return {
        ...state,
        status: fetchStates.success,
        message: action.payload.message,
        role: action.payload.role,
        firstName: action.payload.firstName,
        loggedIn: action.payload.authenticated,
      };
    default:
      return state;
  }
};

export default account;
