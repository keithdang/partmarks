import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../App.css";

class AddForm extends Component {
  myChangeHander = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    const { submitFunc, contents } = this.props;
    return (
      <div className="list">
        <div>
          <Form>
            <Row>
              {Object.keys(contents).map((prop) => (
                <Col>
                  <Form.Control
                    type="text"
                    placeholder={contents[prop] ? contents[prop] : prop}
                    name={prop}
                    onChange={this.myChangeHander}
                  />
                </Col>
              ))}
            </Row>
          </Form>
          <Button onClick={() => submitFunc(this.state)}>Add</Button>
        </div>
      </div>
    );
  }
}
export default AddForm;
