import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourseList, addCourse, deleteCourse } from "../actions/course";
import AccountList from "./AccountList";
import AddPerson from "./AddPerson";
import "../App.css";

class Course extends Component {
  componentDidMount() {
    this.props.fetchCourseList();
  }
  showList = () => {
    const { courseList, deleteCourse } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <ul className="students">
          {courseList.list.map((course) => (
            <li key={course.courseId}>
              <div>
                {course.courseId}:{course.title}:{course.credits}
                <button onClick={() => deleteCourse(course.courseId)}>-</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  render() {
    const { courseList } = this.props;
    return (
      <div className="App">
        {courseList.list !== undefined ? (
          this.showList()
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchCourseList()}>
              Try Again?
            </button>
          </div>
        )}
        {/* <AddPerson add={addTeacher} /> */}
      </div>
    );
  }
}

export default connect(({ courseList }) => ({ courseList }), {
  fetchCourseList,
  addCourse,
  deleteCourse,
})(Course);
