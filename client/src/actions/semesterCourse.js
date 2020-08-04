import { SEMESTER_COURSE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";
var address = "/semesterCourse";
export const fetchSemesterCourseList = (value) =>
  fetchGet({
    endpoint: address + "/list",
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_SUCCESS,
    param: value,
  });

export const addCourse = (value) =>
  fetchPost({
    endpoint: address + "/add",
    param: {
      courseId: value.courseId,
      teacherId: value.teacherId,
      semester: value.semester,
      nYear: value.nYear,
    },
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_ADD,
  });
export const fetchFilter = () =>
  fetchGet({
    endpoint: address + "/filter",
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_FILTER,
  });
export const deleteCourse = (value) =>
  fetchPost({
    endpoint: address + "/delete",
    param: { id: value },
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_DELETE,
  });
