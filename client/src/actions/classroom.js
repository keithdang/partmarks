import { CLASSROOM_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";
var address = "/classroom";
export const fetchClassroomList = (value) =>
  fetchGet({
    endpoint: address + "/list",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_SUCCESS,
    param: value,
  });

export const fetchFilter = () =>
  fetchGet({
    endpoint: address + "/filter",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_FILTER,
  });

export const fetchAverage = (value) =>
  fetchGet({
    endpoint: address + "/average",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_AVERAGE,
    param: { courseId: value.courseId },
  });

export const fetchGrade = (value) =>
  fetchGet({
    endpoint: address + "/grades",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_GRADES,
    param: { courseId: value.courseId },
  });

export const addCourse = (value) =>
  fetchPost({
    endpoint: address + "/add",
    param: {
      courseId: value.courseId,
      studentId: value.studentId,
    },
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_ADD,
  });

export const deleteCourse = (value) =>
  fetchPost({
    endpoint: address + "/delete",
    param: { courseId: value.courseId, studentId: value.studentId },
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_DELETE,
  });
