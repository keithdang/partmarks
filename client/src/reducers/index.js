import { combineReducers } from "redux";
import student from "./student";
import studentList from "./studentList";
import teacherList from "./teacherList";
import courseList from "./courseList";
import semesterCourseList from "./semesterCourseList";
import classroomList from "./classroomList";
import marksTemplateList from "./marksTemplate";
import gradeList from "./gradeList";
export default combineReducers({
  student,
  studentList,
  teacherList,
  courseList,
  semesterCourseList,
  classroomList,
  marksTemplateList,
  gradeList,
});
