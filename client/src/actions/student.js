import axios from "axios";
import { STUDENT, STUDENT_LIST } from "./types";
import { fetchGet, fetchPost } from "./fetchFunc";

export const fetchStudent = (value) => async (dispatch) => {
  dispatch({ type: STUDENT.FETCH });
  const res = await axios.get("/students/one", {
    params: { id: value },
  });
  dispatch({ type: STUDENT.FETCH_SUCCESS, payload: res.data });
};

export const fetchStudentList = () =>
  fetchGet({
    endpoint: "/students/list",
    FETCH_TYPE: STUDENT_LIST.FETCH,
    SUCCESS_TYPE: STUDENT_LIST.FETCH_SUCCESS,
  });

export const addStudent = (value) =>
  fetchPost({
    endpoint: "/students/add",
    param: {
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
    },
    FETCH_TYPE: STUDENT_LIST.FETCH,
    SUCCESS_TYPE: STUDENT_LIST.FETCH_ADD,
  });

export const deleteStudent = (value) =>
  fetchPost({
    endpoint: "/students/delete",
    param: { id: value },
    FETCH_TYPE: STUDENT_LIST.FETCH,
    SUCCESS_TYPE: STUDENT_LIST.FETCH_DELETE,
  });
