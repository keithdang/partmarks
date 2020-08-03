import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchClassroomList,
  addCourse,
  deleteCourse,
  fetchFilter,
} from "../actions/classroom";
import { fetchSemesterCourseList } from "../actions/semesterCourse";
import { fetchStudentList } from "../actions/student";
import AccountList from "./AccountList";
import AddSelectionForm from "./AddSelectionForm";
import "../App.css";
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
    if (classroomList.status === CLASSROOM_LIST.FETCH_ADD) {
      fetchClassroomList();
    }
  }
  render() {
    const {
      classroomList,
      fetchClassroomList,
      fetchFilter,
      semesterCourseList,
      studentList,
      addCourse,
      deleteCourse,
    } = this.props;
    return (
      <div className="App">
        <AccountList
          list={classroomList.list}
          title="Classroom"
          fetchList={fetchClassroomList}
          deleteFunc={deleteCourse}
          filter={{
            display: "title",
            submit: "courseId",
            func: fetchFilter,
            list: classroomList.filterList,
          }}
        />
        {semesterCourseList.list && studentList.list && (
          <AddSelectionForm
            title="Sign Up"
            contents={{
              courseId: null,
              studentId: null,
            }}
            submitFunc={addCourse}
            fetchList={fetchClassroomList}
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
                displayTitle: studentList.list.map((item) => item.firstName),
              },
            ]}
          />
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
    fetchFilter,
    addCourse,
    deleteCourse,
  }
)(Classroom);
