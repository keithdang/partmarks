import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { signup, login, logout, fetchAuthenticated } from "../actions/account";

class AuthForm extends Component {
  state = {
    username: "",
    password: "",
    bSignUp: false,
    bTeacher: true,
    buttonClicked: false,
  };
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
  };
  login = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  clickSignUpInfo = () => {
    this.setState({ bSignUp: !this.state.bSignUp });
  };

  toggleIsTeacher = () => {
    this.setState({ bTeacher: !this.state.bTeacher });
  };

  myChangeHander = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  teacherForm = () => {
    var teacher = { firstName: "", middleName: "", lastName: "" };
    return (
      <form>
        {Object.keys(teacher).map((prop) => (
          <input type="text" name={prop} onChange={this.myChangeHander} />
        ))}
      </form>
    );
  };
  studentForm = () => {
    var student = { firstName: "" };
    return (
      <form>
        {Object.keys(student).map((prop) => (
          <input type="text" name={prop} onChange={this.myChangeHander} />
        ))}
      </form>
    );
  };
  signUpAdditional = () => {
    const { bTeacher } = this.state;
    return (
      <div>
        <h4>Role: Teacher/Student</h4>
        <FormGroup controlId="switchBox">
          <FormCheck
            type="switch"
            label={bTeacher ? "Teacher" : "Student"}
            onClick={this.toggleIsTeacher}
          />
        </FormGroup>
        {bTeacher ? this.teacherForm() : this.studentForm()}
      </div>
    );
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
      <div className="App">
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
              {/* <FormGroup controlId="formBasicCheckbox">
                <FormCheck
                  type="switch"
                  label={this.state.bTeacher ? "Teacher" : "Student"}
                  onClick={this.toggleIsTeacher}
                />
              </FormGroup> */}
              <div>
                <FormGroup controlId="formBasicCheckbox">
                  <FormCheck
                    type="checkbox"
                    label="Sign Up Pre-Req"
                    onClick={this.clickSignUpInfo}
                  />
                </FormGroup>
              </div>
              {this.state.bSignUp && this.signUpAdditional()}
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
