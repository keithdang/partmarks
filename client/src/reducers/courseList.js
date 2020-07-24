import { COURSE_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_TEACHER_LIST = {};

const teacherList = (state = DEFAULT_TEACHER_LIST, action) => {
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
      state.list.push(action.payload.teacher);
      return { ...state, status: fetchStates.fetching };
    case COURSE_LIST.FETCH_DELETE:
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload.teacher.id) {
          state.list.splice(i, 1);
          continue;
        }
      }
      return { ...state, status: fetchStates.fetching };
    default:
      return state;
  }
};

export default teacherList;
