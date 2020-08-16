import { GRADE_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_GRADE_LIST = {};

const gradeList = (state = DEFAULT_GRADE_LIST, action) => {
  switch (action.type) {
    case GRADE_LIST.FETCH:
      return { ...state, status: fetchStates.fetching };
    case GRADE_LIST.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case GRADE_LIST.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        list: action.payload.gradeList,
      };
    case GRADE_LIST.FETCH_ADD:
      return { ...state, status: GRADE_LIST.FETCH_ADD };
    case GRADE_LIST.FETCH_DELETE:
      for (var i = 0; i < state.list.length; i++) {
        if (
          state.list[i].courseId === action.payload.course.courseId &&
          state.list[i].studentId === action.payload.course.studentId
        ) {
          state.list.splice(i, 1);
          continue;
        }
      }
      return { ...state, status: fetchStates.fetching };
    case GRADE_LIST.FETCH_FILTER:
      return {
        ...state,
        status: fetchStates.fetching,
        filterList: action.payload.filterList,
      };
    case GRADE_LIST.FETCH_UPDATE_SCORE:
      console.log("UPDATE SCORE", action.payload);
      return {
        ...state,
        status: GRADE_LIST.FETCH_UPDATE_SCORE,
      };
    case GRADE_LIST.FETCH_SUB_FILTER:
      return {
        ...state,
        status: fetchStates.fetching,
        subFilterList: action.payload.filterList,
      };
    default:
      return state;
  }
};

export default gradeList;
