import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchStudent,
  fetchStudentList,
  addStudent,
  deleteStudent,
} from "../actions/student";
import AccountList from "./AccountList";
import AddPerson from "./AddPerson";
import "../App.css";

class Student extends Component {
  render() {
    const {
      fetchStudentList,
      studentList,
      addStudent,
      deleteStudent,
    } = this.props;
    return (
      <div>
        <AccountList
          accountList={studentList.list}
          title="Students"
          deleteFunc={deleteStudent}
          fetchList={fetchStudentList}
        />
        <AddPerson add={addStudent} />
      </div>
    );
  }
}

export default connect(
  ({ student, studentList }) => ({ student, studentList }),
  { fetchStudent, fetchStudentList, addStudent, deleteStudent }
)(Student);