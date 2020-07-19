import { STUDENT } from "./types";

export const fetchStudent = () => (dispatch) => {
  dispatch({ type: STUDENT.FETCH });
  return fetch("/api/students")
    .then((res) => res.json())
    .then((student) => {
      dispatch({ type: STUDENT.FETCH_SUCCESS, student: student });
    })
    .catch((error) => console.log("error", error));
};
