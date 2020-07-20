import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent, fetchStudentList, addStudent } from "../actions/student";
import "../App.css";

class Student extends Component {
  componentDidMount() {
    // this.props.fetchStudent(1);
    this.props.fetchStudentList();
    // this.props.addStudent();
  }

  showStudentList = () => {
    const { studentList } = this.props;
    return (
      <div>
        <h1>Students</h1>
        <ul className="students">
          {studentList.list.map((student) => (
            <li key={student.id}>
              {student.id}:{student.firstName}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  showStudents = () => {
    const { student } = this.props;
    return (
      <div>
        <h1>Student</h1>
        <ul className="students">
          <li key={student.id}>
            {student.id}:{student.firstName}
          </li>
        </ul>
      </div>
    );
  };
  studentUI = () => {
    const { student, fetchStudent, studentList } = this.props;
    return (
      <div className="App">
        {student.id !== "" ? (
          this.showStudents()
        ) : (
          <div>
            <h1>No Students :(</h1>
            <button className="more" onClick={() => fetchStudent(1)}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  };

  studentListUI = () => {
    const { student, fetchStudent, studentList } = this.props;
    return (
      <div className="App">
        {studentList.list !== undefined ? (
          this.showStudentList()
        ) : (
          <div>
            <h1>No Students :(</h1>
            <button className="more" onClick={() => fetchStudent(1)}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  };
  render() {
    const { student, fetchStudent, studentList } = this.props;
    // return this.studentUI();
    return this.studentListUI();
  }
}

export default connect(
  ({ student, studentList }) => ({ student, studentList }),
  { fetchStudent, fetchStudentList, addStudent }
)(Student);
