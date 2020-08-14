import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class AddSelectionForm extends Component {
  setItem = (id, choice) => {
    this.setState({ [id]: choice });
  };
  myChangeHander = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    const { lists, title, contents, submitFunc } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <div className="list">
          {lists &&
            lists.map((list) => (
              <div>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={list.title}
                  as={ButtonGroup}
                >
                  {list.list &&
                    list.displayTitle.map((item, index) => (
                      <Dropdown.Item
                        onClick={() =>
                          this.setItem(list.tableId, list.list[index])
                        }
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                </DropdownButton>
              </div>
            ))}
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
export default AddSelectionForm;
