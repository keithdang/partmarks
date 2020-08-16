import { STUDENT_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_STUDENT_LIST = { list: [] };

const studentList = (state = DEFAULT_STUDENT_LIST, action) => {
  switch (action.type) {
    case STUDENT_LIST.FETCH:
      return { ...state, status: fetchStates.fetching };
    case STUDENT_LIST.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case STUDENT_LIST.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        list: action.payload.studentList,
      };
    case STUDENT_LIST.FETCH_ADD:
      state.list.push(action.payload.student);
      return { ...state, status: fetchStates.fetching };
    case STUDENT_LIST.FETCH_DELETE:
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload.student.id) {
          state.list.splice(i, 1);
          continue;
        }
      }
      return { ...state, status: fetchStates.fetching };
    default:
      return state;
  }
};

export default studentList;
