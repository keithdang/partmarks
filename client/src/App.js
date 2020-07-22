import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/teachers">Teachers</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/teachers">
            <Teacher />
          </Route>
          <Route path="/students">
            <Student />
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

export default App;
