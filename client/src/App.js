import React, { Component } from "react";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";

class App extends Component {
  render() {
    return (
      <div>
        <Student />
        <AddStudent />
      </div>
    );
  }
}

export default App;
