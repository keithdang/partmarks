import { COURSE_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_COURSE_LIST = { filterList: [] };

const courseList = (state = DEFAULT_COURSE_LIST, action) => {
  switch (action.type) {
    case COURSE_LIST.FETCH:
      return { ...state, status: fetchStates.fetching };
    case COURSE_LIST.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case COURSE_LIST.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        list: action.payload.courseList,
      };
    case COURSE_LIST.FETCH_ADD:
      state.list.push(action.payload.course);
      return { ...state, status: fetchStates.fetching };
    case COURSE_LIST.FETCH_DELETE:
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].courseId === action.payload.course.courseId) {
          state.list.splice(i, 1);
          continue;
        }
      }
      return { ...state, status: fetchStates.fetching };
    case COURSE_LIST.FETCH_FILTER:
      return {
        ...state,
        status: fetchStates.fetching,
        filterList: action.payload.filterList,
      };
    default:
      return state;
  }
};

export default courseList;
