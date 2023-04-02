import React, { Component } from "react";
import axios from "axios";
import configData from "../config.json";
import "../componentCss/logInPage.css";

class LogInPage extends Component {
  state = {
    loginData: { email: "", password: "" },
    registerData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
      isAdmin: "",
    },
  };

  // login handlers
  handleLoginEmailChange = (event) => {
    const changedLoginData = { ...this.state.loginData };
    changedLoginData.email = event.currentTarget.value;
    this.setState({ loginData: changedLoginData });
  };
  handleLoginPassChange = (event) => {
    const changedLoginData = { ...this.state.loginData };
    changedLoginData.password = event.currentTarget.value;
    this.setState({ loginData: changedLoginData });
  };
  handleLogInFormSubmit = async (event) => {
    try {
      // prevent default reloading after form submit
      event.preventDefault();
      document.getElementById("loginButton").innerHTML = "Please wait...";
      // post data & get token in response
      const { data } = await axios.post(
        configData.NEWS_LOGIN_URL,
        this.state.loginData
      );
      // check the response length
      if (data.status.length > 0) {
        // set the token from reponse data to localstorage
        window.localStorage.setItem("token", data.status[1]);
        // push current location to home page
        window.history.pushState({}, "", "/");
        // then reload the page
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error.response);
      document.getElementById("loginButton").innerHTML = "Log-In";
      alert(
        `Expected Error => ${error.response.data.message} <= [${error.response.statusText}:${error.response.status}]`
      );
    }
  };

  // skipLogInHandle
  skipLogInHandle = async (event) => {
    event.preventDefault();
    try {
      document.getElementById("skipLogIn").innerHTML = "Please Wait...";
      const { data } = await axios.post(configData.NEWS_LOGIN_URL, {
        email: "guest@gmail.com",
        password: "Guest1",
      });
      if (data.status.length > 0) {
        window.localStorage.setItem("token", data.status[1]);
        window.location.assign("/");
      }
    } catch (error) {
      console.log(error.response);
      document.getElementById("skipLogIn").innerHTML = "skip-LogIn";
      alert(
        `Expected Error => ${error.response.data.message} <= [${error.response.statusText}:${error.response.status}]`
      );
    }
  };

  // register handlers
  handleRegisterFirstNameChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.firstName = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleRegisterLastNameChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.lastName = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleRegisterEmailChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.email = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleRegisterPassChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.password = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleRegisterConfirmPassChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.confirm_password = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleAdminSecretKeyChange = (event) => {
    const changedRegisterData = { ...this.state.registerData };
    changedRegisterData.isAdmin = event.currentTarget.value;
    this.setState({ registerData: changedRegisterData });
  };
  handleRegisterFormSubmit = async (event) => {
    try {
      event.preventDefault();
      document.getElementById("SignUpButton").innerHTML = "Please Wait...";
      console.log(this.state);
      const { data } = await axios.post(
        configData.NEWS_SIGNUP_URL,
        this.state.registerData
      );
      if (data) {
        const requiredData = {
          email: this.state.registerData.email,
          password: this.state.registerData.password,
        };
        const { data } = await axios.post(
          configData.NEWS_LOGIN_URL,
          requiredData
        );
        console.log(requiredData, data);
        if (data.status.length > 0) {
          window.localStorage.setItem("token", data.status[1]);
          window.history.pushState({}, "", "/");
          window.location.reload(true);
        }
      }
    } catch (error) {
      document.getElementById("SignUpButton").innerHTML = "Sign-Up";
      let expectedErrors = Object.values(error.response.data.status);
      alert(
        `Expected Error => ${expectedErrors.map((data) => {
          return data.message;
        })} <= [${error.response.statusText}:${error.response.status}]`
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="Main-container">
          <div
            className="subMainContainer"
            // style={{transform : `scale(${(1-((1366-(window.screen.width))/1366))})`}}
          >
            <div className="login-Container">
              <div className="subContainerHeader">
                <h2>
                  Hello there,
                  <br />
                  welcome back
                </h2>
              </div>
              <form className="form" onSubmit={this.handleLogInFormSubmit}>
                <ul>
                  <li>
                    <input
                      value={this.state.loginData.email}
                      onChange={this.handleLoginEmailChange}
                      type="email"
                      name=""
                      id="loginEmail"
                      placeholder="Email-Id"
                    />
                  </li>
                  <li>
                    <input
                      value={this.state.loginData.password}
                      onChange={this.handleLoginPassChange}
                      type="password"
                      name=""
                      id="loginPassword"
                      placeholder="Password"
                    />
                  </li>
                </ul>
                <button id="loginButton" className="loginButton">
                  Log-In
                </button>
              </form>
              <div
                style={{
                  marginTop: "40px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                <span>New User? SignUp on right cart ==&gt;</span>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                <span>
                  Want to experience the application,
                  <br />
                  <p style={{ marginTop: "5px" }}>
                    Be our Guest User =&gt;{" "}
                    <a
                      className="skipLogIn"
                      id="skipLogIn"
                      href=""
                      onClick={this.skipLogInHandle}
                    >
                      Skip-LogIn
                    </a>
                  </p>
                </span>
              </div>
            </div>
            <div className="borderContainer">
              <div className="borderRight"></div>
              <div className="centerCircle">OR</div>
            </div>
            <div className="register-Container">
              <div className="subContainerHeader">
                <h2>
                  New User?
                  <br />
                  Get Onboard
                </h2>
              </div>
              <form className="form" onSubmit={this.handleRegisterFormSubmit}>
                <ul>
                  <li>
                    <input
                      type="text"
                      name=""
                      id="firstName"
                      value={this.state.registerData.firstName}
                      onChange={this.handleRegisterFirstNameChange}
                      placeholder="First Name"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      name=""
                      id="lastName"
                      value={this.state.registerData.lastName}
                      onChange={this.handleRegisterLastNameChange}
                      placeholder="Last Name"
                    />
                  </li>
                  <li>
                    <input
                      type="email"
                      name=""
                      id="registerEmail"
                      value={this.state.registerData.email}
                      onChange={this.handleRegisterEmailChange}
                      placeholder="Email-Id"
                    />
                  </li>
                  <li>
                    <input
                      type="password"
                      name=""
                      id="registerPassword"
                      value={this.state.registerData.password}
                      onChange={this.handleRegisterPassChange}
                      placeholder="Password"
                    />
                  </li>
                  <li>
                    <input
                      type="password"
                      name=""
                      id="ConfirmPassword"
                      value={this.state.registerData.confirm_password}
                      onChange={this.handleRegisterConfirmPassChange}
                      placeholder="Confirm_Password"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      name=""
                      id="adminSecretKey"
                      value={this.state.registerData.isAdmin}
                      onChange={this.handleAdminSecretKeyChange}
                      placeholder="Secret_Key for Admin (optional)"
                    />
                  </li>
                </ul>
                <button id="SignUpButton">Sign-Up</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LogInPage;
