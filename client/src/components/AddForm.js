import React, { Component } from "react";
import "../App.css";

class AddForm extends Component {
  myChangeHander = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    const { submitFunc, contents } = this.props;
    let input;
    return (
      <div>
        <form>
          {Object.keys(contents).map((prop) => (
            <input type="text" name={prop} onChange={this.myChangeHander} />
          ))}
        </form>
        <button onClick={() => submitFunc(this.state)}>Add</button>
      </div>
    );
  }
}
export default AddForm;
