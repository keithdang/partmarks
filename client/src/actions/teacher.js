import axios from "axios";
import { TEACHER, TEACHER_LIST } from "./types";

export const fetchTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER.FETCH });
  const res = await axios.get("/teacher/one", {
    params: { id: value },
  });
  dispatch({ type: TEACHER.FETCH_SUCCESS, teacher: res.data });
};

export const fetchTeacherList = () => async (dispatch) => {
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios.get("/teacher/list");
  dispatch({ type: TEACHER_LIST.FETCH_SUCCESS, payload: res.data });
};

export const addTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/teacher/add",
    params: {
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
    },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: TEACHER_LIST.FETCH_ADD, payload: res.data });
};

export const deleteTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/teacher/delete",
    params: { id: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: TEACHER_LIST.FETCH_DELETE, payload: res.data });
};
