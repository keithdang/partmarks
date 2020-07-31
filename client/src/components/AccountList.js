import React, { Component } from "react";
class AccountList extends Component {
  componentDidMount() {
    this.props.fetchList();
  }

  showList = () => {
    const { list, title, deleteFunc } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <ul className="students">
          {list.map((account) => (
            <li key={account.id || account.courseId}>
              <div className="list">
                {Object.values(account).map((prop) => (
                  <div className="list-row">{prop}</div>
                ))}
                <button
                  //need new way to distinguish different ids of each table else it'll be a long list
                  onClick={() => deleteFunc(account.id || account.courseId)}
                >
                  -
                </button>
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
