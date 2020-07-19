import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "./actions/student";
import "./App.css";
import student from "./reducers/student";

class App extends Component {
  componentDidMount() {
    this.props.fetchStudent();
  }

  showStudents = () => {
    const { student } = this.props;
    return (
      <div>
        <h1>Student</h1>
        <ul className="students">
          <li key={student.id}>
            {student.id}:{student.firstName}
          </li>
        </ul>
      </div>
    );
  };
  render() {
    const { student } = this.props;
    console.log("render", student);
    return (
      <div className="App">
        {student.id !== "" ? (
          this.showStudents()
        ) : (
          <div>
            <h1>No Students :(</h1>
            <button className="more" onClick={this.props.fetchStudent}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ student }) => ({ student }), { fetchStudent })(App);
