import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTemplatesList,
  fetchFilter,
  addTemplate,
  deleteTemplate,
} from "../actions/marksTemplate";
import { fetchSemesterCourseList } from "../actions/semesterCourse";
import AccountList from "../components/AccountList";
import AddHybridForm from "../components/AddHybridForm";
import "../App.css";

class MarksTemplate extends Component {
  componentDidMount() {
    const { fetchTemplatesList, fetchSemesterCourseList } = this.props;
    fetchTemplatesList();
    fetchSemesterCourseList();
  }
  genKey = (account) => {
    return account.courseId.toString() + account.title;
  };
  submitParams = (account) => {
    return {
      courseId: account.courseId,
      title: account.title,
    };
  };
  render() {
    const {
      marksTemplateList,
      fetchTemplatesList,
      addTemplate,
      semesterCourseList,
      deleteTemplate,
      fetchFilter,
    } = this.props;
    return (
      <div className="App">
        <h1>Marks Template</h1>
        <div>
          {marksTemplateList.list !== undefined ? (
            <div>
              <AccountList
                list={marksTemplateList.list}
                edit={{ view: true }}
                displayList={["Course Id", "Title", "Total", "Weight"]}
                title="Marks Template"
                fetchList={fetchTemplatesList}
                deleteFunc={deleteTemplate}
                genKey={this.genKey}
                submitParams={this.submitParams}
                filter={{
                  display: "title",
                  submit: "courseId",
                  func: fetchFilter,
                  list: marksTemplateList.filterList,
                }}
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
                title: "Title",
                total: "Total",
                weight: "Weight",
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
    fetchFilter,
  }
)(MarksTemplate);
