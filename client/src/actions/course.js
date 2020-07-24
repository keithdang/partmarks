import axios from "axios";
import { COURSE_LIST } from "./types";

export const fetchCourseList = () => async (dispatch) => {
  dispatch({ type: COURSE_LIST.FETCH });
  const res = await axios.get("/course/list");
  dispatch({ type: COURSE_LIST.FETCH_SUCCESS, payload: res.data });
};

export const addCourse = (value) => async (dispatch) => {
  dispatch({ type: COURSE_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/course/add",
    params: {
      departmentId: value.departmentId,
      courseId: value.courseId,
      title: value.title,
      credits: value.credits,
    },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: COURSE_LIST.FETCH_ADD, payload: res.data });
};

export const deleteCourse = (value) => async (dispatch) => {
  dispatch({ type: COURSE_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/course/delete",
    params: { id: value },
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: COURSE_LIST.FETCH_DELETE, payload: res.data });
};
