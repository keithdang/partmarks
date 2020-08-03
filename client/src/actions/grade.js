import { GRADE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";
var address = "/grade";
export const fetchGradeList = (value) =>
  fetchGet({
    endpoint: address + "/list",
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_SUCCESS,
    param: value,
  });

export const fetchFilter = () =>
  fetchGet({
    endpoint: address + "/filter",
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_FILTER,
  });

export const fetchSubFilter = (value) =>
  fetchGet({
    endpoint: address + "/subfilter",
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_SUB_FILTER,
    param: value,
  });

export const addGrade = (value) =>
  fetchPost({
    endpoint: address + "/add",
    param: {
      courseId: value.courseId,
      studentId: value.studentId,
      title: value.title,
      score: value.score,
      total: value.total,
      weight: value.weight,
    },
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_ADD,
  });

export const deleteCourse = (value) =>
  fetchPost({
    endpoint: address + "/delete",
    param: { courseId: value.courseId, studentId: value.studentId },
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_DELETE,
  });
