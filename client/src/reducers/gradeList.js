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
    case GRADE_LIST.FETCH_AVERAGE:
      return {
        ...state,
        status: fetchStates.fetching,
        average: action.payload.average[0].round,
      };
    case GRADE_LIST.FETCH_PERCENTAGES:
      var arr = [];
      action.payload.percentages.map((el) => {
        if (el.percent !== null) {
          arr.push(el.percent);
        }
      });
      return {
        ...state,
        status: fetchStates.fetching,
        percentages: arr,
      };
    default:
      return state;
  }
};

export default gradeList;
