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
  randomRbga = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  };
  colorArr = (num) => {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push(this.randomRbga());
    }
    return arr;
  };
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
            "Percent",
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
          graph={{
            data: "percent",
            labelArr: [
              "0-10%",
              "11-20%",
              "21-30%",
              "31-40%",
              "41-50%",
              "51-60%",
              "61-70%",
              "71-80%",
              "81-90%",
              "91-100%",
            ],
            barX: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            dataArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            colorArr: this.colorArr(10),
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
