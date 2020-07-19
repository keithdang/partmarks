import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "../actions/student";
import "../App.css";

class Student extends Component {
  componentDidMount() {
    this.props.fetchStudent(1);
  }

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
  render() {
    const { student, fetchStudent } = this.props;
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
  }
}

export default connect(({ student }) => ({ student }), { fetchStudent })(
  Student
);
