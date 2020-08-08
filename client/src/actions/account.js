import { ACCOUNT } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";
var address = "/account";

export const signup = (value) =>
  fetchPost({
    endpoint: address + "/signup",
    param: {
      username: value.username,
      password: value.password,
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });

export const login = (value) =>
  fetchPost({
    endpoint: address + "/login",
    param: {
      username: value.username,
      password: value.password,
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  });

export const logout = () =>
  fetchGet({
    endpoint: address + "/logout",
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
  });

export const fetchAuthenticated = () =>
  fetchGet({
    endpoint: address + "/authenticated",
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
  });
