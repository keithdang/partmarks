import { MARKS_TEMPLATE_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_TEMPLATE_LIST = {};

const marksTemplateList = (state = DEFAULT_TEMPLATE_LIST, action) => {
  switch (action.type) {
    case MARKS_TEMPLATE_LIST.FETCH:
      return { ...state, status: fetchStates.fetching };
    case MARKS_TEMPLATE_LIST.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case MARKS_TEMPLATE_LIST.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        list: action.payload.templateList,
      };
    case MARKS_TEMPLATE_LIST.FETCH_ADD:
      return { ...state, status: MARKS_TEMPLATE_LIST.FETCH_ADD };
    case MARKS_TEMPLATE_LIST.FETCH_DELETE:
      for (var i = 0; i < state.list.length; i++) {
        if (
          state.list[i].courseId === action.payload.course.courseId &&
          state.list[i].title === action.payload.course.title
        ) {
          state.list.splice(i, 1);
          continue;
        }
      }
      return { ...state, status: fetchStates.fetching };
    default:
      return state;
  }
};

export default marksTemplateList;
