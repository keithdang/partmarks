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
          displayList={["Id", "First Name", "Middle Name", "Last Name"]}
          title="Teachers"
          //   deleteFunc={deleteTeacher}
          fetchList={fetchTeacherList}
        />
        <AddForm
          contents={{
            firstName: "First Name",
            middleName: "Middle Name",
            lastName: "Last Name",
          }}
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
