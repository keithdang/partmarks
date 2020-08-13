import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";

class AccountList extends Component {
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

  showList = () => {
    const { list, title, filter, deleteFunc } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        {filter && filter.list && list && list[0] && this.filterDropdown()}
        <Table>
          <thead>
            {Object.keys(list[0]).map((prop) => (
              <th>{prop}</th>
            ))}
          </thead>
          <tbody>
            {list.map((account) => (
              <tr>
                {Object.values(account).map((prop) => (
                  <td>{prop}</td>
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

  render() {
    const { list, fetchList } = this.props;
    return (
      <div className="App">
        {list !== undefined ? (
          this.showList()
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
