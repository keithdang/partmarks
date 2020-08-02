import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTemplatesList,
  addTemplate,
  deleteTemplate,
} from "../actions/marksTemplate";
import { fetchSemesterCourseList } from "../actions/semesterCourse";
// import { fetchStudentList } from "../actions/student";
import AccountList from "./AccountList";
import AddForm from "./AddForm";
import AddHybridForm from "./AddHybridForm";
import "../App.css";
class MarksTemplate extends Component {
  componentDidMount() {
    const { fetchTemplatesList, fetchSemesterCourseList } = this.props;
    fetchTemplatesList();
    fetchSemesterCourseList();
  }

  render() {
    const {
      marksTemplateList,
      fetchTemplatesList,
      addTemplate,
      semesterCourseList,
      deleteTemplate,
    } = this.props;
    return (
      <div className="App">
        <div>
          {marksTemplateList.list !== undefined ? (
            <div>
              <AccountList
                list={marksTemplateList.list}
                title="Marks Template"
                fetchList={fetchTemplatesList}
                deleteFunc={deleteTemplate}
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
        <div>
          {semesterCourseList.list && (
            <AddHybridForm
              title="Add Template"
              contents={{
                title: null,
                total: null,
                weight: null,
              }}
              submitFunc={addTemplate}
              lists={[
                {
                  title: "Courses",
                  tableId: "courseId",
                  list: semesterCourseList.list.map((item) => item.id),
                  displayTitle: semesterCourseList.list.map(
                    (item) => item.title + ":" + item.lastName
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ marksTemplateList, semesterCourseList }) => ({
    marksTemplateList,
    semesterCourseList,
  }),
  {
    fetchTemplatesList,
    addTemplate,
    fetchSemesterCourseList,
    deleteTemplate,
  }
)(MarksTemplate);
