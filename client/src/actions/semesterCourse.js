import { SEMESTER_COURSE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchSemesterCourseList = () =>
  fetchGet({
    endpoint: "/semesterCourse/list",
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_SUCCESS,
  });

export const addCourse = (value) =>
  fetchPost({
    endpoint: "/semesterCourse/add",
    param: {
      courseId: value.courseId,
      teacherId: value.teacherId,
      semester: value.semester,
      nYear: value.nYear,
    },
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_ADD,
  });

export const deleteCourse = (value) =>
  fetchPost({
    endpoint: "/semesterCourse/delete",
    param: { id: value },
    FETCH_TYPE: SEMESTER_COURSE_LIST.FETCH,
    SUCCESS_TYPE: SEMESTER_COURSE_LIST.FETCH_DELETE,
  });
