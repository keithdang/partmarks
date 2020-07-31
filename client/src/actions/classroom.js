import { CLASSROOM_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchClassroomList = () =>
  fetchGet({
    endpoint: "/classroom/list",
    FETCH_TYPE: CLASSROOM_LIST.FETCH,
    SUCCESS_TYPE: CLASSROOM_LIST.FETCH_SUCCESS,
  });

// export const addCourse = (value) =>
//   fetchPost({
//     endpoint: "/classroom/add",
//     param: {
//       departmentId: value.departmentId,
//       courseId: value.courseId,
//       title: value.title,
//       credits: value.credits,
//     },
//     FETCH_TYPE: CLASSROOM_LIST.FETCH,
//     SUCCESS_TYPE: CLASSROOM_LIST.FETCH_ADD,
//   });

// export const deleteCourse = (value) =>
//   fetchPost({
//     endpoint: "/classroom/delete",
//     param: { id: value },
//     FETCH_TYPE: CLASSROOM_LIST.FETCH,
//     SUCCESS_TYPE: CLASSROOM_LIST.FETCH_DELETE,
//   });
