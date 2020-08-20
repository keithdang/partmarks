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
  randomRbga = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  };
  colorArr = (num) => {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push(this.randomRbga());
    }
    return arr;
  };
  render() {
    const {
      classroomList,
      fetchClassroomList,
      fetchFilter,
      semesterCourseList,
      studentList,
      addCourse,
      deleteCourse,
      account,
    } = this.props;
    return (
      <div className="App">
        <h1>Classroom</h1>
        <AccountList
          list={classroomList.list}
          edit={{ view: account.role === "teacher" }}
          displayList={[
            "Course",
            "Course Id",
            "Prof",
            "First Name",
            "Student Id",
            "Grade",
          ]}
          title="Classroom"
          fetchList={fetchClassroomList}
          deleteFunc={deleteCourse}
          filter={{
            display: "title",
            submit: "courseId",
            func: fetchFilter,
            list: classroomList.filterList,
          }}
          graph={{
            data: "percent",
            labelArr: [
              "0-10%",
              "11-20%",
              "21-30%",
              "31-40%",
              "41-50%",
              "51-60%",
              "61-70%",
              "71-80%",
              "81-90%",
              "91-100%",
            ],
            barX: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            dataArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            colorArr: this.colorArr(10),
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
  ({ classroomList, semesterCourseList, studentList, account }) => ({
    classroomList,
    semesterCourseList,
    studentList,
    account,
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
