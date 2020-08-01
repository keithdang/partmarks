import { MARKS_TEMPLATE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";

export const fetchTemplatesList = () =>
  fetchGet({
    endpoint: "/marksTemplate/list",
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_SUCCESS,
  });

export const addTemplate = (value) =>
  fetchPost({
    endpoint: "/marksTemplate/add",
    param: {
      courseId: value.courseId,
      title: value.title,
      total: value.total,
      weight: value.weight,
    },
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_ADD,
  });

export const deleteTemplate = (value) =>
  fetchPost({
    endpoint: "/marksTemplate/delete",
    param: { courseId: value.courseId, title: value.title },
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_DELETE,
  });
