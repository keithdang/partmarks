import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourseList, addCourse, deleteCourse } from "../actions/course";
import AccountList from "./AccountList";
import AddPerson from "./AddPerson";
import "../App.css";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: null,
      courseId: null,
      credits: null,
      title: "",
    };
  }
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
  myChangeHander = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  submitCourse = () => {
    this.props.addCourse(this.state);
  };
  addCourseForm = () => {
    return (
      <div>
        <form>
          <input
            type="text"
            name="departmentId"
            onChange={this.myChangeHander}
          />
          <input type="text" name="courseId" onChange={this.myChangeHander} />
          <input type="text" name="credits" onChange={this.myChangeHander} />
          <input type="text" name="title" onChange={this.myChangeHander} />
        </form>
        <button onClick={() => this.submitCourse()}>Add</button>
      </div>
    );
  };
  render() {
    const { courseList } = this.props;
    return (
      <div className="App">
        {courseList.list !== undefined ? (
          <div>
            {this.showList()}
            {this.addCourseForm()}
          </div>
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
