import { STUDENT_LIST } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_STUDENT_LIST = {};

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
        list: action.studentList.studentList,
      };
    case STUDENT_LIST.FETCH_ADD:
      state.list.push(action.payload.student);
      return { ...state, status: fetchStates.fetching };
    default:
      return state;
  }
};

export default studentList;
