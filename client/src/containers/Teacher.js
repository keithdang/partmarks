import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTeacher, fetchTeacherList } from "../actions/teacher";
import AccountList from "../components/AccountList";
import "../App.css";

class Teacher extends Component {
  render() {
    const { fetchTeacherList, teacherList } = this.props;
    return (
      <div className="App">
        <h1>Teachers</h1>
        <AccountList
          list={teacherList.list}
          displayList={["Id", "First Name", "Middle Name", "Last Name"]}
          title="Teachers"
          fetchList={fetchTeacherList}
        />
      </div>
    );
  }
}

export default connect(({ teacherList }) => ({ teacherList }), {
  fetchTeacher,
  fetchTeacherList,
})(Teacher);
