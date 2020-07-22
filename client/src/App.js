import React, { Component } from "react";
import Student from "./components/Student";
import Teacher from "./components/Teacher";

class App extends Component {
  render() {
    return (
      <div>
        <Student />
        <Teacher />
      </div>
    );
  }
}

export default App;
