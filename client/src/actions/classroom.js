import { CLASSROOM_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchClassroomList = () =>
  fetchGet({
    endpoint: "/classroom/list",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_SUCCESS,
  });

export const addCourse = (value) =>
  fetchPost({
    endpoint: "/classroom/add",
    param: {
      courseId: value.courseId,
      studentId: value.studentId,
    },
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_ADD,
  });

export const deleteCourse = (value) =>
  fetchPost({
    endpoint: "/classroom/delete",
    param: { courseId: value.courseId, studentId: value.studentId },
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_DELETE,
  });
