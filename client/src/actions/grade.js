import { GRADE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchGradeList = () =>
  fetchGet({
    endpoint: "/grade/list",
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_SUCCESS,
  });

export const addGrade = (value) =>
  fetchPost({
    endpoint: "/grade/add",
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
    endpoint: "/grade/delete",
    param: { courseId: value.courseId, studentId: value.studentId },
    FETCH_TYPE: GRADE_LIST.FETCH,
    SUCCESS_TYPE: GRADE_LIST.FETCH_DELETE,
  });
