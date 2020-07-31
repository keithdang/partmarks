import { CLASSROOM_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_CLASSROOM_LIST = {};

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
      //   state.list.push(action.payload.classroom);
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
    default:
      return state;
  }
};

export default classroomList;
