import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchClassroomList,
  addCourse,
  deleteCourse,
} from "../actions/classroom";
import { fetchSemesterCourseList } from "../actions/semesterCourse";
import { fetchStudentList } from "../actions/student";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import AddSelectionForm from "./AddSelectionForm";
import "../App.css";
import semesterCourseList from "../reducers/semesterCourseList";
import studentList from "../reducers/studentList";
import { CLASSROOM_LIST } from "../actions/types";
class Classroom extends Component {
  componentDidMount() {
    const {
      fetchClassroomList,
      fetchSemesterCourseList,
      fetchStudentList,
    } = this.props;
    fetchClassroomList();
    fetchSemesterCourseList();
    fetchStudentList();
  }
  componentDidUpdate() {
    const { classroomList, fetchClassroomList } = this.props;
    if (classroomList.status == CLASSROOM_LIST.FETCH_ADD) {
      fetchClassroomList();
    }
  }
  render() {
    const {
      classroomList,
      fetchClassroomList,
      semesterCourseList,
      studentList,
      addCourse,
      deleteCourse,
    } = this.props;
    return (
      <div className="App">
        {classroomList.list !== undefined ? (
          <div>
            <AccountList
              list={classroomList.list}
              title="Classroom"
              fetchList={fetchClassroomList}
              deleteFunc={deleteCourse}
            />
            {semesterCourseList.list && studentList.list && (
              <AddSelectionForm
                title="Sign Up"
                contents={{
                  courseId: null,
                  studentId: null,
                }}
                submitFunc={addCourse}
                lists={[
                  {
                    title: "Courses",
                    tableId: "courseId",
                    list: semesterCourseList.list.map((item) => item.id),
                    displayTitle: semesterCourseList.list.map(
                      (item) => item.title + ":" + item.lastName
                    ),
                  },
                  {
                    title: "Students",
                    tableId: "studentId",
                    list: studentList.list.map((item) => item.id),
                    displayTitle: studentList.list.map(
                      (item) => item.firstName
                    ),
                  },
                ]}
              />
            )}
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchClassroomList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ classroomList, semesterCourseList, studentList }) => ({
    classroomList,
    semesterCourseList,
    studentList,
  }),
  {
    fetchClassroomList,
    fetchSemesterCourseList,
    fetchStudentList,
    addCourse,
    deleteCourse,
  }
)(Classroom);
