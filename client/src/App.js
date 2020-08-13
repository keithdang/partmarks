import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Navbar, NavbarBrand, NavDropdown, NavItem } from "react-bootstrap";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Course from "./components/Course";
import SemesterCourse from "./components/SemesterCourse";
import Classroom from "./components/Classroom";
import MarksTemplate from "./components/MarksTemplate";
import Grade from "./components/Grade";
import AuthForm from "./components/AuthForm";
import { fetchAuthenticated } from "./actions/account";

class App extends Component {
  componentDidMount() {
    this.props.fetchAuthenticated();
  }
  AuthRoute = (props) => {
    if (
      !this.props.account.loggedIn &&
      this.props.account.status === "success"
    ) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    const { component, path } = props;
    return <Route path={path} component={component} />;
  };

  render() {
    const { account } = this.props;
    return (
      <Router>
        <Navbar>
          <NavbarBrand>
            <Link to="/">Home</Link>
          </NavbarBrand>
          <NavbarBrand>
            <Link to="/auth">Sign In/Up</Link>
          </NavbarBrand>
          {account.loggedIn && (
            <div style={{ display: "flex" }}>
              <div>
                <NavDropdown title="Accounts">
                  <NavbarBrand>
                    <Link to="/students">Students</Link>
                  </NavbarBrand>
                  <NavbarBrand>
                    <Link to="/teachers">Teachers</Link>
                  </NavbarBrand>
                </NavDropdown>
              </div>
              <div>
                <NavDropdown title="Course">
                  <NavbarBrand>
                    <Link to="/courses">Courses</Link>
                  </NavbarBrand>
                  <NavbarBrand>
                    <Link to="/semesterCourses">Semester Courses</Link>
                  </NavbarBrand>
                  <NavbarBrand>
                    <Link to="/classroom">Classroom</Link>
                  </NavbarBrand>
                  <NavbarBrand>
                    <Link to="/grade">Grade</Link>
                  </NavbarBrand>
                  {account.role === "teacher" && (
                    <div>
                      <NavbarBrand>
                        <Link to="/marksTemplate">Marks Template</Link>
                      </NavbarBrand>
                    </div>
                  )}
                </NavDropdown>
              </div>
            </div>
          )}
        </Navbar>
        {/* <nav>
          <ul>
            {account.loggedIn && (
              <div>
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
        </nav> */}
        <Switch>
          <this.AuthRoute path="/students" component={Student} />
          <this.AuthRoute path="/teachers" component={Teacher} />
          <this.AuthRoute path="/courses" component={Course} />
          <this.AuthRoute path="/semesterCourses" component={SemesterCourse} />
          <this.AuthRoute path="/classroom" component={Classroom} />
          <this.AuthRoute path="/marksTemplate" component={MarksTemplate} />
          <this.AuthRoute path="/grade" component={Grade} />
          <Route path="/auth">
            <AuthForm />
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(({ account }) => ({ account }), {
  fetchAuthenticated,
})(App);
