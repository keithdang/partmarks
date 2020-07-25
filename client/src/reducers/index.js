import { combineReducers } from "redux";
import student from "./student";
import studentList from "./studentList";
import teacherList from "./teacherList";
import courseList from "./courseList";
import semesterCourseList from "./semesterCourseList";
export default combineReducers({
  student,
  studentList,
  teacherList,
  courseList,
  semesterCourseList,
});
