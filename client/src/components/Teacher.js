import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTeacher,
  fetchTeacherList,
  addTeacher,
  deleteTeacher,
} from "../actions/teacher";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import "../App.css";

class Teacher extends Component {
  render() {
    const {
      fetchTeacherList,
      teacherList,
      //   deleteTeacher,
      addTeacher,
    } = this.props;
    return (
      <div className="App">
        <AccountList
          list={teacherList.list}
          title="Teachers"
          //   deleteFunc={deleteTeacher}
          fetchList={fetchTeacherList}
        />
        <AddForm
          contents={{ firstName: null, middleName: null, lastName: null }}
          submitFunc={addTeacher}
        />
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
