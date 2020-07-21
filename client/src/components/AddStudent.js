import React, { Component } from "react";
// import { MODES } from "../actions/types";
import { connect } from "react-redux";
import { addStudent } from "../actions/student";
import "../App.css";

class AddStudent extends Component {
  render() {
    let input;
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            this.props.addStudent(input.value);
            input.value = "";
          }}
        >
          <button type="submit" className="Edit-Time-Button">
            Add
          </button>
          <input ref={(node) => (input = node)} />
        </form>
      </div>
    );
  }
}

export default connect(({}) => ({}), { addStudent })(AddStudent);
