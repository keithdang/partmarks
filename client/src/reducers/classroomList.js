import { CLASSROOM_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_CLASSROOM_LIST = { list: [] };

const classroomList = (state = DEFAULT_CLASSROOM_LIST, action) => {
  switch (action.type) {
    case CLASSROOM_LIST.FETCH:
      return { ...state, status: fetchStates.fetching };
    case CLASSROOM_LIST.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case CLASSROOM_LIST.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        list: action.payload.classroomList,
      };
    case CLASSROOM_LIST.FETCH_ADD:
      state.list.push(action.payload.classroom);
      return { ...state, status: CLASSROOM_LIST.FETCH_ADD };
    case CLASSROOM_LIST.FETCH_DELETE:
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
    case CLASSROOM_LIST.FETCH_FILTER:
      return {
        ...state,
        status: fetchStates.fetching,
        filterList: action.payload.filterList,
      };
    case CLASSROOM_LIST.FETCH_AVERAGE:
      return {
        ...state,
        status: fetchStates.fetching,
        average: action.payload.average[0].round,
      };
    case CLASSROOM_LIST.FETCH_GRADES:
      var arr = [];
      action.payload.grades.map((el) => {
        if (el.grade !== null) {
          arr.push(el.grade);
        }
      });
      return {
        ...state,
        status: fetchStates.fetching,
        grades: arr,
      };
    default:
      return state;
  }
};

export default classroomList;
