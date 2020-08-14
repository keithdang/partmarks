import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCourseList,
  addCourse,
  deleteCourse,
  fetchFilter,
} from "../actions/course";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import "../App.css";

class Course extends Component {
  render() {
    const {
      addCourse,
      courseList,
      deleteCourse,
      fetchCourseList,
      fetchFilter,
    } = this.props;
    return (
      <div className="App">
        <AccountList
          list={courseList.list}
          displayList={[
            "Course Id",
            "Department Id",
            "Display Id",
            "Title",
            "Credits",
          ]}
          title="Courses"
          deleteFunc={deleteCourse}
          fetchList={fetchCourseList}
          filter={{
            display: "departmentId",
            submit: "departmentId",
            func: fetchFilter,
            list: courseList.filterList,
          }}
        />
        <AddForm
          contents={{
            departmentId: "Department Id",
            courseId: "Course Id",
            credits: "Credits",
            title: "Title",
          }}
          submitFunc={addCourse}
        />
      </div>
    );
  }
}

export default connect(({ courseList }) => ({ courseList }), {
  fetchCourseList,
  addCourse,
  deleteCourse,
  fetchFilter,
})(Course);
