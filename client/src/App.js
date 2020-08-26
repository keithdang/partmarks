import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Navbar, NavbarBrand, NavDropdown, Nav, Button } from "react-bootstrap";
import Student from "./containers/Student";
import Teacher from "./containers/Teacher";
import Course from "./containers/Course";
import SemesterCourse from "./containers/SemesterCourse";
import Classroom from "./containers/Classroom";
import MarksTemplate from "./containers/MarksTemplate";
import Grade from "./containers/Grade";
import AuthForm from "./components/AuthForm";
import { fetchAuthenticated, logout } from "./actions/account";

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
        <Navbar bg="dark" variant="dark">
          <NavbarBrand>
            <Link to="/">Home</Link>
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
          <Nav className="ml-auto">
            {account.firstName && (
              <Navbar.Text style={{ paddingRight: "10px" }}>
                {account.firstName}{" "}
              </Navbar.Text>
            )}
            {account.loggedIn ? (
              <Button onClick={() => this.props.logout()}>Log Out</Button>
            ) : (
              <Link to="/auth">Sign In/Up</Link>
            )}
          </Nav>
        </Navbar>
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
  logout,
})(App);
