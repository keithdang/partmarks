import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent } from "../actions/student";
import "../App.css";

class AddStudent extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.addStudent()}>Add Students</button>
      </div>
    );
    // const { modify, id, icon, mode } = this.props;
    // let input;
    // return (
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       if (!input.value.trim()) {
    //         return;
    //       }
    //       if (mode === MODES.EDIT_NAME) {
    //         modify(id, input.value);
    //       } else {
    //         modify(id, parseInt(input.value));
    //       }
    //       input.value = "";
    //     }}
    //   >
    //     <button type="submit" className="Edit-Time-Button">
    //       {icon}
    //     </button>
    //     <input ref={(node) => (input = node)} className="Edit-Time-Input-Box" />
    //   </form>
    // );
  }
}

export default connect(({}) => ({}), { addStudent })(AddStudent);
