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
            departmentId: null,
            courseId: null,
            credits: null,
            title: "",
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
