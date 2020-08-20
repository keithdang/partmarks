import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent, fetchStudentList, addStudent } from "../actions/student";
import AccountList from "./AccountList";
import "../App.css";

class Student extends Component {
  render() {
    const { fetchStudentList, studentList } = this.props;
    return (
      <div className="App">
        <h1>Students</h1>
        <AccountList
          list={studentList.list}
          displayList={["Id", "First Name"]}
          title="Students"
          fetchList={fetchStudentList}
        />
      </div>
    );
  }
}

export default connect(
  ({ student, studentList }) => ({ student, studentList }),
  { fetchStudent, fetchStudentList, addStudent }
)(Student);
