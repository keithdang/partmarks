import axios from "axios";
import { STUDENT } from "./types";

export const fetchStudent = (value) => async (dispatch) => {
  dispatch({ type: STUDENT.FETCH });
  const res = await axios.get("/students/one", {
    params: { id: value },
  });
  dispatch({ type: STUDENT.FETCH_SUCCESS, student: res.data });
};
