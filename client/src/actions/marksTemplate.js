import { MARKS_TEMPLATE_LIST } from "./types";
import { fetchPost, fetchGet } from "./fetchFunc";
var address = "/marksTemplate";
export const fetchTemplatesList = (value) =>
  fetchGet({
    endpoint: address + "/list",
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_SUCCESS,
    param: value,
  });

export const addTemplate = (value) =>
  fetchPost({
    endpoint: address + "/add",
    param: {
      courseId: value.courseId,
      title: value.title,
      total: value.total,
      weight: value.weight,
    },
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_ADD,
  });

export const fetchFilter = () =>
  fetchGet({
    endpoint: address + "/filter",
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_FILTER,
  });

export const deleteTemplate = (value) =>
  fetchPost({
    endpoint: address + "/delete",
    param: { courseId: value.courseId, title: value.title },
    FETCH_TYPE: MARKS_TEMPLATE_LIST.FETCH,
    SUCCESS_TYPE: MARKS_TEMPLATE_LIST.FETCH_DELETE,
  });
