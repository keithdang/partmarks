import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Course from "./components/Course";
import SemesterCourse from "./components/SemesterCourse";
import Classroom from "./components/Classroom";
import MarksTemplate from "./components/MarksTemplate";
import Grade from "./components/Grade";
import AuthForm from "./components/AuthForm";

class App extends Component {
  render() {
    const { account } = this.props;
    console.log("account", account);
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Sign In/Up</Link>
            </li>
            {account.loggedIn && (
              <div>
                <li>
                  <Link to="/students">Students</Link>
                </li>
                <li>
                  <Link to="/teachers">Teachers</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/semesterCourses">Semester Courses</Link>
                </li>
                <li>
                  <Link to="/classroom">Classroom</Link>
                </li>
                <li>
                  <Link to="/grade">Grade</Link>
                </li>
                {account.role === "teacher" && (
                  <div>
                    <li>
                      <Link to="/marksTemplate">Marks Template</Link>
                    </li>
                  </div>
                )}
              </div>
            )}
          </ul>
        </nav>
        <Switch>
          <Route path="/grade">
            <Grade />
          </Route>
          <Route path="/marksTemplate">
            <MarksTemplate />
          </Route>
          <Route path="/classroom">
            <Classroom />
          </Route>
          <Route path="/semesterCourses">
            <SemesterCourse />
          </Route>
          <Route path="/courses">
            <Course />
          </Route>
          <Route path="/teachers">
            <Teacher />
          </Route>
          <Route path="/students">
            <Student />
          </Route>
          <Route path="/auth">
            <AuthForm />
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </Router>
      // <div>
      //   <Student />
      //   <Teacher />
      // </div>
    );
  }
}

// export default App;
export default connect(({ account }) => ({ account }), {
  // signup,
  // login,
  // logout,
  // fetchAuthenticated,
})(App);
