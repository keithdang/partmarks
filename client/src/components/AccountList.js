import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class AccountList extends Component {
  state = {
    editMode: false,
    editSubmissions: {},
    editList: [],
  };
  componentDidMount() {
    const { fetchList, filter } = this.props;
    fetchList(this.state);
    if (filter && filter.func) {
      filter.func();
    }
  }

  submit = (account) => {
    const { deleteFunc, title } = this.props;
    let params;
    switch (title) {
      case "Classroom":
        params = {
          courseId: account.courseId,
          studentId: account.studentId,
        };
        break;
      case "Marks Template":
        params = {
          courseId: account.courseId,
          title: account.title,
        };
        break;
      default:
        params = account.id || account.courseId;
    }
    deleteFunc(params);
  };

  genKey = (account) => {
    const { title } = this.props;
    let key;
    switch (title) {
      case "Classroom":
        key = account.courseId.toString() + account.studentId.toString();
        break;
      case "Grades":
        key =
          account.courseId.toString() +
          account.studentId.toString() +
          account.title;
        break;
      case "Marks Template":
        key = account.courseId.toString() + account.title;
        break;
      default:
        key = account.id || account.courseId;
    }
    return key;
  };
  clickFilter = (item, filter) => {
    const { fetchList } = this.props;
    this.setState({ [filter.submit]: item[filter.submit] });
    fetchList({ [filter.submit]: item[filter.submit] });
    if (filter.subFilter && filter.subFilter.func) {
      filter.subFilter.func({ [filter.submit]: item[filter.submit] });
    }
  };
  clickSubFilter = (item, filter) => {
    const { fetchList } = this.props;
    this.setState({ [filter.submit]: item[filter.submit] }, () => {
      fetchList(this.state);
    });
  };
  filterDropdown = () => {
    const { fetchList, filter } = this.props;
    return (
      <div>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          as={ButtonGroup}
        >
          <Dropdown.Item onClick={() => fetchList()}>All</Dropdown.Item>
          {filter.list.map((item) => (
            <Dropdown.Item onClick={() => this.clickFilter(item, filter)}>
              {item[filter.display]}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {filter.subFilter && (
          <DropdownButton
            id="dropdown-basic-button"
            title="Filter"
            as={ButtonGroup}
          >
            <Dropdown.Item onClick={() => fetchList()}>All</Dropdown.Item>
            {filter.subFilter.list &&
              filter.subFilter.list.map((item) => (
                <Dropdown.Item
                  onClick={() => this.clickSubFilter(item, filter.subFilter)}
                >
                  {item[filter.display]}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        )}
      </div>
    );
  };

  changeEditSubmission = (event) => {
    const { edit } = this.props;
    const { editList } = this.state;
    let nam = event.target.name;
    let val = event.target.value;

    var doesNotExist = true;
    var newEditList = editList;
    var num = 0;
    newEditList.map((element, index) => {
      if (element[edit.contents] === nam) {
        num = index;
        doesNotExist = false;
      }
    });

    var editEl = { id: nam, [edit.columns]: val };
    if (doesNotExist) {
      newEditList.push(editEl);
      this.setState({ editList: newEditList });
    } else {
      newEditList[num] = editEl;
      this.setState({ editList: newEditList });
    }
  };

  showList = () => {
    const { list, title, filter, deleteFunc, displayList, edit } = this.props;
    const { editMode } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        {filter && filter.list && list && list[0] && this.filterDropdown()}
        <Table>
          <thead>
            {displayList
              ? displayList.map((element) => <th>{element}</th>)
              : Object.keys(list[0]).map((prop) => <th>{prop}</th>)}
          </thead>
          <tbody>
            {list.map((account) => (
              <tr>
                {Object.keys(account).map((value) => (
                  <td>
                    {editMode && edit.columns === value ? (
                      <Form.Control
                        type="text"
                        placeholder={account[value]}
                        onChange={this.changeEditSubmission.bind(this)}
                        name={account[edit.contents]}
                      />
                    ) : (
                      account[value]
                    )}
                  </td>
                ))}
                {deleteFunc && (
                  <button onClick={() => this.submit(account)}>-</button>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  submitEdittedRow = () => {
    this.state.editList.map((element) => {
      this.props.edit.func(element);
    });
    this.setState({ editMode: false });
  };

  editPanel = () => {
    const { edit } = this.props;
    const { editMode } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({ editMode: !editMode })}>
          Edit
        </Button>
        {editMode && (
          <Button onClick={() => this.submitEdittedRow()}>Save</Button>
        )}
      </div>
    );
  };

  render() {
    const { list, fetchList, edit } = this.props;
    return (
      <div className="App">
        {list !== undefined ? (
          <div>
            {this.showList()}
            {edit && this.editPanel()}
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default AccountList;
