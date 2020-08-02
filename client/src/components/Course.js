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
  componentDidMount() {
    this.props.fetchCourseList();
  }
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
          filterList={courseList.filterList}
          filterFunc={fetchFilter}
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
