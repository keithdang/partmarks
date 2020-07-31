import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchClassroomList } from "../actions/classroom";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import "../App.css";

class Classroom extends Component {
  componentDidMount() {
    this.props.fetchClassroomList();
  }
  render() {
    const { classroomList, fetchClassroomList } = this.props;
    return (
      <div className="App">
        {classroomList.list !== undefined ? (
          <div>
            <AccountList
              list={classroomList.list}
              title="Classroom"
              fetchList={fetchClassroomList}
            />
            {/* <AddForm
              contents={{
                departmentId: null,
                courseId: null,
                credits: null,
                title: "",
              }}
              submitFunc={addCourse}
            /> */}
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchClassroomList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ classroomList }) => ({ classroomList }), {
  fetchClassroomList,
})(Classroom);
