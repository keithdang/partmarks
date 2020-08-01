import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGradeList } from "../actions/grade";
import AccountList from "./AccountList";
import "../App.css";
class Grade extends Component {
  componentDidMount() {
    const { fetchGradeList } = this.props;
    fetchGradeList();
  }

  render() {
    const { gradeList, fetchGradeList } = this.props;
    return (
      <div className="App">
        {gradeList.list !== undefined ? (
          <div>
            <AccountList
              list={gradeList.list}
              title="Grades"
              fetchList={fetchGradeList}
            />
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchGradeList()}>
              Try Again?
            </button>
          </div>
        )}
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
  }
)(Grade);
