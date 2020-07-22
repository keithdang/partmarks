import axios from "axios";
import { STUDENT, STUDENT_LIST } from "./types";

export const fetchStudent = (value) => async (dispatch) => {
  dispatch({ type: STUDENT.FETCH });
  const res = await axios.get("/students/one", {
    params: { id: value },
  });
  dispatch({ type: STUDENT.FETCH_SUCCESS, student: res.data });
};

export const fetchStudentList = () => async (dispatch) => {
  dispatch({ type: STUDENT_LIST.FETCH });
  const res = await axios.get("/students/list");
  dispatch({ type: STUDENT_LIST.FETCH_SUCCESS, studentList: res.data });
};

export const addStudent = (value) => async (dispatch) => {
  dispatch({ type: STUDENT_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/students/add",
    params: { firstName: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: STUDENT_LIST.FETCH_ADD, payload: res.data });
};

export const deleteStudent = (value) => async (dispatch) => {
  dispatch({ type: STUDENT_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/students/delete",
    params: { id: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: STUDENT_LIST.FETCH_DELETE, payload: res.data });
};
