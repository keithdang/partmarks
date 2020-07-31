import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourseList, addCourse, deleteCourse } from "../actions/course";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import "../App.css";

class Course extends Component {
  componentDidMount() {
    this.props.fetchCourseList();
  }
  render() {
    const { addCourse, courseList, deleteCourse, fetchCourseList } = this.props;
    return (
      <div className="App">
        {courseList.list !== undefined ? (
          <div>
            <AccountList
              list={courseList.list}
              title="Courses"
              deleteFunc={deleteCourse}
              fetchList={fetchCourseList}
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

export default connect(({ courseList }) => ({ courseList }), {
  fetchCourseList,
  addCourse,
  deleteCourse,
})(Course);
