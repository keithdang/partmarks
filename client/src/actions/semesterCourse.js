import axios from "axios";
import { SEMESTER_COURSE_LIST } from "./types";

export const fetchSemesterCourseList = () => async (dispatch) => {
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH });
  const res = await axios.get("/semesterCourse/list");
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH_SUCCESS, payload: res.data });
};

export const addCourse = (value) => async (dispatch) => {
  console.log(value);
  dispatch({ type: SEMESTER_COURSE_LIST.FETCH });
  const res = await axios({
    method: "post",
    url: "/semesterCourse/add",
    params: {
      courseId: value.courseId,
      teacherId: value.teacherId,
      semester: value.semester,
      nYear: value.nYear,
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
