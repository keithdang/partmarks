import { combineReducers } from "redux";
import student from "./student";
import studentList from "./studentList";
import teacherList from "./teacherList";
import courseList from "./courseList";
export default combineReducers({
  student,
  studentList,
  teacherList,
  courseList,
});
