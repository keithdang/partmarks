import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGradeList, fetchFilter, fetchSubFilter } from "../actions/grade";
import AccountList from "./AccountList";
import "../App.css";
class Grade extends Component {
  componentDidMount() {
    const { fetchGradeList } = this.props;
    fetchGradeList();
  }

  render() {
    const {
      gradeList,
      fetchGradeList,
      fetchFilter,
      fetchSubFilter,
    } = this.props;
    return (
      <div className="App">
        <AccountList
          list={gradeList.list}
          title="Grades"
          fetchList={fetchGradeList}
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
  }
)(Grade);
