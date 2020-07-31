import axios from "axios";
import { TEACHER, TEACHER_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER.FETCH });
  const res = await axios.get("/teacher/one", {
    params: { id: value },
  });
  dispatch({ type: TEACHER.FETCH_SUCCESS, teacher: res.data });
};

export const fetchTeacherList = () =>
  fetchGet({
    endpoint: "/teacher/list",
    FETCH_TYPE: TEACHER_LIST.FETCH,
    SUCCESS_TYPE: TEACHER_LIST.FETCH_SUCCESS,
  });

export const addTeacher = (value) =>
  fetchPost({
    endpoint: "/teacher/add",
    param: {
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
    },
    FETCH_TYPE: TEACHER_LIST.FETCH,
    SUCCESS_TYPE: TEACHER_LIST.FETCH_ADD,
  });

export const deleteTeacher = (value) =>
  fetchPost({
    endpoint: "/teacher/delete",
    param: { id: value },
    FETCH_TYPE: TEACHER_LIST.FETCH,
    SUCCESS_TYPE: TEACHER_LIST.FETCH_DELETE,
  });
