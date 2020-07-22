import React, { Component } from "react";
import "../App.css";

class AddPerson extends Component {
  render() {
    const { add } = this.props;
    let input;
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            add(input.value);
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
export default AddPerson;
