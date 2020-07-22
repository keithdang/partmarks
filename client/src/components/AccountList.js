import React, { Component } from "react";
class AccountList extends Component {
  componentDidMount() {
    this.props.fetchList();
  }

  showList = () => {
    const { accountList, title, deleteFunc } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <ul className="students">
          {accountList.map((account) => (
            <li key={account.id}>
              <div>
                {account.id}:{account.firstName}
                <button onClick={() => deleteFunc(account.id)}>-</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { accountList, fetchList } = this.props;
    return (
      <div className="App">
        {accountList !== undefined ? (
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
