import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormGroup,
  FormControl,
  FormCheck,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { signup, login, fetchAuthenticated } from "../actions/account";

class AuthForm extends Component {
  state = {
    username: "",
    password: "",
    bSignUp: false,
    bTeacher: true,
    buttonClicked: false,
  };

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  signup = () => {
    this.setState({ buttonClicked: true });
    console.log(this.state);
    this.props.signup(this.state);
  };
  login = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  clickSignUpInfo = (value) => {
    this.setState({ bSignUp: value });
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
      <Form>
        <Row>
          {Object.keys(teacher).map((prop) => (
            <Col>
              <Form.Control
                type="text"
                name={prop}
                placeholder={prop}
                onChange={this.myChangeHander}
              />
            </Col>
          ))}
        </Row>
      </Form>
    );
  };
  studentForm = () => {
    var student = { firstName: "", middleName: "", lastName: "" };
    return (
      <Form>
        <Row>
          {Object.keys(student).map((prop) => (
            <Col>
              <Form.Control
                type="text"
                name={prop}
                placeholder={prop}
                onChange={this.myChangeHander}
              />
            </Col>
          ))}
        </Row>
      </Form>
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

  accountDisplay = () => {
    return (
      <div>
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
      </div>
    );
  };

  loginDisplay = () => {
    return (
      <div>
        <h4>Login</h4>
        {this.accountDisplay()}
        <Button onClick={this.login}>Log In</Button>
      </div>
    );
  };

  signUpDisplay = () => {
    return (
      <div>
        <h4>SignUp</h4>
        {this.accountDisplay()}
        {this.signUpAdditional()}
        <Button onClick={this.signup}>
          Sign Up as {this.state.bTeacher ? "Teacher" : "Student"}
        </Button>
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
    const { bSignUp } = this.state;
    const { account } = this.props;
    return (
      <div className="App">
        {!this.props.account.loggedIn ? (
          <div>
            <h2>Auth Form</h2>
            <Button onClick={() => this.clickSignUpInfo(true)}>
              Sign Up Form
            </Button>
            <Button onClick={() => this.clickSignUpInfo(false)}>
              Login Form
            </Button>
            {bSignUp ? this.signUpDisplay() : this.loginDisplay()}
          </div>
        ) : (
          <div>
            {account.role === "teacher" ? (
              <h4>Welcome to Teacher Dashboard</h4>
            ) : (
              <h4>Welcome to Student Dashboard</h4>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ account }) => ({ account }), {
  signup,
  login,
  fetchAuthenticated,
})(AuthForm);
