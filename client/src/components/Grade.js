import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {
  fetchGradeList,
  fetchFilter,
  fetchSubFilter,
  updateScore,
} from "../actions/grade";
import AccountList from "./AccountList";
import { GRADE_LIST } from "../actions/types";
import "../App.css";
class Grade extends Component {
  componentDidMount() {
    const { fetchGradeList } = this.props;
    fetchGradeList();
  }
  componentDidUpdate() {
    const { gradeList, fetchGradeList } = this.props;
    if (gradeList.status === GRADE_LIST.FETCH_UPDATE_SCORE) {
      fetchGradeList();
    }
  }
  render() {
    const {
      gradeList,
      fetchGradeList,
      fetchFilter,
      fetchSubFilter,
      updateScore,
    } = this.props;
    return (
      <div className="App">
        <AccountList
          list={gradeList.list}
          displayList={[
            "Id",
            "Course Id",
            "Student Id",
            "Title",
            "Score",
            "Out Of",
            "Weight",
          ]}
          title="Grades"
          fetchList={fetchGradeList}
          edit={{
            func: updateScore,
            columns: "score",
            contents: "id",
          }}
          filter={{
            display: "title",
            submit: "courseId",
            subFilter: {
              display: "title",
              submit: "title",
              func: fetchSubFilter,
              list: gradeList.subFilterList,
            },
            func: fetchFilter,
            list: gradeList.filterList,
          }}
        />
      </div>
    );
  }
}

export default connect(
  ({ gradeList }) => ({
    gradeList,
  }),
  {
    fetchGradeList,
    fetchFilter,
    fetchSubFilter,
    updateScore,
  }
)(Grade);
