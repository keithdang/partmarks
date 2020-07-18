import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // Initialize state
  state = { passwords: [], student: {} };

  componentDidMount() {
    this.getStudent();
  }

  getStudent = () => {
    console.log("button");
    fetch("/api/students")
      .then((res) => res.json())
      .then((student) => {
        this.setState(student);
        console.log("student", student);
      })
      .catch((error) => console.log("error", error));
  };

  showStudents = () => {
    const { student } = this.state;
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
    const { student } = this.state;

    return (
      <div className="App">
        {Object.keys(student).length ? (
          this.showStudents()
        ) : (
          <div>
            <h1>No Students :(</h1>
            <button className="more" onClick={this.getStudent}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
