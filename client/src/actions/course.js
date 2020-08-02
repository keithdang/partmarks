import { COURSE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchCourseList = (value) =>
  fetchGet({
    endpoint: "/course/list",
    FETCH_TYPE: COURSE_LIST.FETCH,
    SUCCESS_TYPE: COURSE_LIST.FETCH_SUCCESS,
    param: value,
  });

export const fetchFilter = () =>
  fetchGet({
    endpoint: "/course/filter",
    FETCH_TYPE: COURSE_LIST.FETCH,
    SUCCESS_TYPE: COURSE_LIST.FETCH_FILTER,
  });

export const addCourse = (value) =>
  fetchPost({
    endpoint: "/course/add",
    param: {
      departmentId: value.departmentId,
      courseId: value.courseId,
      title: value.title,
      credits: value.credits,
    },
    FETCH_TYPE: COURSE_LIST.FETCH,
    SUCCESS_TYPE: COURSE_LIST.FETCH_ADD,
  });

export const deleteCourse = (value) =>
  fetchPost({
    endpoint: "/course/delete",
    param: { id: value },
    FETCH_TYPE: COURSE_LIST.FETCH,
    SUCCESS_TYPE: COURSE_LIST.FETCH_DELETE,
  });
