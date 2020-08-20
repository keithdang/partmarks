import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSemesterCourseList,
  fetchTeacherSemesterCourseList,
  fetchFilter,
  addCourse,
  deleteCourse,
} from "../actions/semesterCourse";
import { fetchCourseList } from "../actions/course";
import { fetchTeacherList } from "../actions/teacher";
import Button from "react-bootstrap/Button";
import AccountList from "./AccountList";
import AddSelectionForm from "./AddSelectionForm";
import "../App.css";

class SemesterCourse extends Component {
  state = {
    viewMode: true,
  };
  componentDidMount() {
    const {
      fetchCourseList,
      fetchSemesterCourseList,
      fetchTeacherSemesterCourseList,
      fetchTeacherList,
      account,
    } = this.props;
    account.role === "teacher"
      ? fetchSemesterCourseList()
      : fetchTeacherSemesterCourseList();
    fetchCourseList();
    fetchTeacherList();
  }

  render() {
    const {
      account,
      addCourse,
      semesterCourseList,
      courseList,
      deleteCourse,
      fetchSemesterCourseList,
      fetchTeacherSemesterCourseList,
      teacherList,
      fetchFilter,
    } = this.props;

    return (
      <div className="App">
        <h1>Semester Courses</h1>
        <Button onClick={() => this.setState({ viewMode: false })}>
          View All
        </Button>
        <Button onClick={() => this.setState({ viewMode: true })}>
          View/Edit Yours
        </Button>
        <AccountList
          list={semesterCourseList.list}
          edit={{ view: this.state.viewMode }}
          displayList={["Id", "Course Id", "Title", "Teacher Id", "Prof"]}
          title="Semester Courses"
          deleteFunc={deleteCourse}
          fetchList={
            account.role === "teacher" && this.state.viewMode
              ? fetchTeacherSemesterCourseList
              : fetchSemesterCourseList
          }
          filter={{
            display: "title",
            submit: "courseId",
            func: fetchFilter,
            list: semesterCourseList.filterList,
          }}
        />
        {courseList.list && teacherList.list && (
          <AddSelectionForm
            title="Add Semester Course"
            contents={{
              courseId: null,
              teacherId: null,
              semester: null,
              nYear: null,
            }}
            submitFunc={addCourse}
            lists={[
              {
                title: "Courses",
                tableId: "courseId",
                list: courseList.list.map((item) => item.courseId),
                displayTitle: courseList.list.map(
                  (item) => item.courseId + " : " + item.title
                ),
              },
              {
                title: "Teachers",
                tableId: "teacherId",
                list: teacherList.list.map((item) => item.id),
                displayTitle: teacherList.list.map((item) => item.firstName),
              },
              {
                title: "Semester",
                tableId: "semester",
                list: [1, 2, 3],
                displayTitle: ["Fall", "Winter", "Summer"],
              },
              {
                title: "Year",
                tableId: "nYear",
                list: [2019, 2020],
                displayTitle: [2019, 2020],
              },
            ]}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({ semesterCourseList, courseList, teacherList, account }) => ({
    semesterCourseList,
    courseList,
    teacherList,
    account,
  }),
  {
    fetchSemesterCourseList,
    fetchTeacherSemesterCourseList,
    addCourse,
    deleteCourse,
    fetchCourseList,
    fetchTeacherList,
    fetchFilter,
  }
)(SemesterCourse);
