import React, { Component } from "react";
class AccountList extends Component {
  componentDidMount() {
    this.props.fetchList();
  }
  submit = (account) => {
    const { deleteFunc, title } = this.props;
    var params = account.id || account.courseId;

    if (title == "Classroom") {
      params = {
        courseId: account.courseId,
        studentId: account.studentId,
      };
    }
    deleteFunc(params);
  };
  genKey = (account) => {
    const { title } = this.props;

    if (title == "Classroom") {
      return account.courseId.toString() + account.studentId.toString();
    }

    return account.id || account.courseId;
  };
  showList = () => {
    const { list, title } = this.props;
    return (
      <div>
        <h1>{title}</h1>
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
