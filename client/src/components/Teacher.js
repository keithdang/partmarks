import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTeacher,
  fetchTeacherList,
  addTeacher,
  deleteTeacher,
} from "../actions/teacher";
import AccountList from "./AccountList";
import AddPerson from "./AddPerson";
import "../App.css";

class Teacher extends Component {
  render() {
    const {
      fetchTeacherList,
      teacherList,
      deleteTeacher,
      addTeacher,
    } = this.props;
    return (
      <div>
        <AccountList
          accountList={teacherList.list}
          title="Teachers"
          deleteFunc={deleteTeacher}
          fetchList={fetchTeacherList}
        />
        <AddPerson add={addTeacher} />
      </div>
    );
  }
}

export default connect(({ teacherList }) => ({ teacherList }), {
  fetchTeacher,
  fetchTeacherList,
  addTeacher,
  deleteTeacher,
})(Teacher);
