import axios from "axios";
import { TEACHER, TEACHER_LIST } from "./types";

export const fetchTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER.FETCH });
  const res = await axios.get("/teachers/one", {
    params: { id: value },
  });
  dispatch({ type: TEACHER.FETCH_SUCCESS, teacher: res.data });
};

export const fetchTeacherList = () => async (dispatch) => {
  console.log("fetchTeachers");
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios.get("/teachers/list");
  dispatch({ type: TEACHER_LIST.FETCH_SUCCESS, payload: res.data });
};

export const addTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/teachers/add",
    params: { firstName: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  console.log("hello", res.data);
  dispatch({ type: TEACHER_LIST.FETCH_ADD, payload: res.data });
};

export const deleteTeacher = (value) => async (dispatch) => {
  dispatch({ type: TEACHER_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/teachers/delete",
    params: { id: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: TEACHER_LIST.FETCH_DELETE, payload: res.data });
};
