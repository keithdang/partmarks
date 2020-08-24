import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class AddSelectionForm extends Component {
  setItem = (id, choice) => {
    this.setState({ [id]: choice });
  };

  render() {
    const { lists, title, submitFunc, fetchList } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <div className="list">
          {lists ? (
            lists.map((list) => (
              <div key={list.title}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={list.title}
                  as={ButtonGroup}
                  key={list.title}
                >
                  {list.list &&
                    list.displayTitle.map((item, index) => (
                      <Dropdown.Item
                        onClick={() =>
                          this.setItem(list.tableId, list.list[index])
                        }
                        key={item}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                </DropdownButton>
              </div>
            ))
          ) : (
            <div>
              <h1>No List :(</h1>
              <button className="more" onClick={() => fetchList()}>
                Try Again?
              </button>
            </div>
          )}
          <Button onClick={() => submitFunc(this.state)}>Add</Button>
        </div>
      </div>
    );
  }
}
export default AddSelectionForm;
