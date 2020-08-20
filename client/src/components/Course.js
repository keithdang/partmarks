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
      account,
    } = this.props;
    var isTeacher = account.role === "teacher";
    return (
      <div className="App">
        <h1>Courses</h1>
        <AccountList
          list={courseList.list}
          edit={{ view: isTeacher }}
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
        {isTeacher && (
          <AddForm
            contents={{
              departmentId: "Department Id",
              courseId: "Course Id",
              credits: "Credits",
              title: "Title",
            }}
            submitFunc={addCourse}
          />
        )}
      </div>
    );
  }
}

export default connect(({ courseList, account }) => ({ courseList, account }), {
  fetchCourseList,
  addCourse,
  deleteCourse,
  fetchFilter,
})(Course);
