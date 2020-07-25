import axios from "axios";
import { SEMESTER_COURSE_LIST } from "./types";

export const fetchCourseList = () => async (dispatch) => {
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH });
  const res = await axios.get("/semesterCourse/list");
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH_SUCCESS, payload: res.data });
};

export const addCourse = (value) => async (dispatch) => {
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/semesterCourse/add",
    params: {
      departmentId: value.departmentId,
      courseId: value.courseId,
      title: value.title,
      credits: value.credits,
    },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH_ADD, payload: res.data });
};

export const deleteCourse = (value) => async (dispatch) => {
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/semesterCourse/delete",
    params: { id: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH_DELETE, payload: res.data });
};
