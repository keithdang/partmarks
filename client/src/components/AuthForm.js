import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { signup, login, logout, fetchAuthenticated } from "../actions/account";
// import fetchStates from "../reducers/fetchStates";

class AuthForm extends Component {
  state = { username: "", password: "", buttonClicked: false };
  componentDidMount() {
    this.props.fetchAuthenticated();
  }
  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  signup = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.signup({ username, password });
    // console.log(this.state);
  };
  login = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.login({ username, password });
    // console.log(this.state);
  };

  //   get Error() {
  //     if (
  //       this.state.buttonClicked &&
  //       this.props.account.status === fetchStates.error
  //     ) {
  //       return <div>{this.props.account.message}</div>;
  //     }
  //   }

  render() {
    return (
      <div>
        <Button onClick={() => this.props.fetchAuthenticated()}>
          Authentication
        </Button>
        {!this.props.account.loggedIn ? (
          <div>
            <h2>Auth Form</h2>
            <FormGroup>
              <FormControl
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.updateUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.updatePassword}
              />
            </FormGroup>
            <div>
              <Button onClick={this.login}>Log In</Button>
              <span> or </span>
              <Button onClick={this.signup}>Sign Up</Button>
            </div>
            <br />
          </div>
        ) : (
          <Button onClick={() => this.props.logout()}>Log Out</Button>
        )}
      </div>
    );
  }
}

export default connect(({ account }) => ({ account }), {
  signup,
  login,
  logout,
  fetchAuthenticated,
})(AuthForm);
// export default AuthForm;
