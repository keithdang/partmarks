import { STUDENT } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_STUDENT = { id: "", firstName: "" };

const student = (state = DEFAULT_STUDENT, action) => {
  console.log(action);
  switch (action.type) {
    case STUDENT.FETCH:
      return { ...state, status: fetchStates.fetching };
    case STUDENT.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case STUDENT.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        id: action.student.student.id,
        firstName: action.student.student.firstName,
      };
    default:
      return state;
  }
};

export default student;
