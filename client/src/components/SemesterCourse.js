import React, { Component } from "react";
import { connect } from "react-redux";
import { DropdownButton, Dropdown } from "react-bootstrap";
import {
  fetchSemesterCourseList,
  addCourse,
  deleteCourse,
} from "../actions/semesterCourse";
import { fetchCourseList } from "../actions/course";
import { fetchTeacherList } from "../actions/teacher";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import AddSelectionForm from "./AddSelectionForm";
import "../App.css";

class SemesterCourse extends Component {
  componentDidMount() {
    const {
      fetchCourseList,
      fetchSemesterCourseList,
      fetchTeacherList,
    } = this.props;
    fetchSemesterCourseList();
    fetchCourseList();
    fetchTeacherList();
  }
  hello() {
    console.log("hello");
  }
  displayAddCourse() {
    return (
      <div>
        <h2>Add Course</h2>
        <DropdownButton id="dropdown-basic-button" title="Courses">
          <Dropdown.Item onClick={this.hello}>Comp 202</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
  render() {
    const {
      addCourse,
      semesterCourseList,
      courseList,
      deleteCourse,
      fetchSemesterCourseList,
      teacherList,
    } = this.props;

    return (
      <div className="App">
        {semesterCourseList.list ? (
          <div>
            <AccountList
              list={semesterCourseList.list}
              title="Semester Courses"
              deleteFunc={deleteCourse}
              fetchList={fetchSemesterCourseList}
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
                    displayTitle: teacherList.list.map(
                      (item) => item.firstName
                    ),
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
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchSemesterCourseList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ semesterCourseList, courseList, teacherList }) => ({
    semesterCourseList,
    courseList,
    teacherList,
  }),
  {
    fetchSemesterCourseList,
    addCourse,
    deleteCourse,
    fetchCourseList,
    fetchTeacherList,
  }
)(SemesterCourse);
