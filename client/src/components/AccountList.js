import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
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
  filterDropdown = () => {
    const { fetchList, filter } = this.props;
    return (
      <DropdownButton id="dropdown-basic-button" title="Filter">
        <Dropdown.Item onClick={() => fetchList()}>All</Dropdown.Item>
        {filter.list.map((item) => (
          <Dropdown.Item
            onClick={() => fetchList({ [filter.submit]: item[filter.submit] })}
          >
            {item[filter.display]}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };
  showList = () => {
    const { list, title, filter } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        {filter && filter.list && this.filterDropdown()}
        <ul className="students">
          {list.map((account) => (
            <li key={this.genKey(account)}>
              <div className="list">
                {Object.values(account).map((prop) => (
                  <div className="list-row">{prop}</div>
                ))}
                <button onClick={() => this.submit(account)}>-</button>
              </div>
            </li>
          ))}
        </ul>
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
