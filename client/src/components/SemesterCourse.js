import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCourseList,
  addCourse,
  deleteCourse,
} from "../actions/semesterCourse";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import "../App.css";

class SemesterCourse extends Component {
  componentDidMount() {
    this.props.fetchCourseList();
  }
  render() {
    const {
      addCourse,
      semesterCourseList,
      deleteCourse,
      fetchCourseList,
    } = this.props;
    return (
      <div className="App">
        {semesterCourseList.list !== undefined ? (
          <div>
            <AccountList
              list={semesterCourseList.list}
              title="Semester Courses"
              deleteFunc={deleteCourse}
              fetchList={fetchCourseList}
            />
            {/* <AddForm
              contents={{
                departmentId: null,
                courseId: null,
                credits: null,
                title: "",
              }}
              submitFunc={addCourse}
            /> */}
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchCourseList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ semesterCourseList }) => ({ semesterCourseList }), {
  fetchCourseList,
  addCourse,
  deleteCourse,
})(SemesterCourse);
