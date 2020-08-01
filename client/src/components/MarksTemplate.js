import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchClassroomList,
  addCourse,
  deleteCourse,
} from "../actions/classroom";
import { fetchTemplatesList } from "../actions/marksTemplate";
// import { fetchStudentList } from "../actions/student";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import AddSelectionForm from "./AddSelectionForm";
import "../App.css";
class MarksTemplate extends Component {
  componentDidMount() {
    const { fetchTemplatesList } = this.props;
    fetchTemplatesList();
  }

  render() {
    const { marksTemplateList, fetchTemplatesList } = this.props;
    return (
      <div className="App">
        {marksTemplateList.list !== undefined ? (
          <div>
            <AccountList
              list={marksTemplateList.list}
              title="Marks Template"
              fetchList={fetchTemplatesList}
            />
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchTemplatesList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ marksTemplateList }) => ({
    marksTemplateList,
  }),
  {
    fetchTemplatesList,
  }
)(MarksTemplate);
