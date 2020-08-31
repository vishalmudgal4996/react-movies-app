import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      usernameRequired: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      mobileRequired: "dispNone",
      mobile: "",
      registrationSuccess: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      showLoginPassword: false,
      showRegisterPassword: false,
    };
  }

  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      usernameRequired: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      mobileRequired: "dispNone",
      mobile: "",
      registrationSuccess: false,
      showLoginPassword: false,
      showRegisterPassword: false,
    });
  };

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  /*login handlers */

  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    if (this.state.username === "" || this.state.loginPassword === "") {
      return;
    }

    //xhr for login
    let dataLogin = null;
    let xhrLogin = new XMLHttpRequest();
    let that = this;
    xhrLogin.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
        sessionStorage.setItem(
          "access-token",
          xhrLogin.getResponseHeader("access-token")
        );
        that.setState({
          loggedIn: true,
        });
        that.closeModalHandler();
      }
    });

    xhrLogin.open("POST", this.props.baseUrl + "auth/login");
    xhrLogin.setRequestHeader(
      "Authorization",
      "Basic " +
        window.btoa(this.state.username + ":" + this.state.loginPassword)
    );
    xhrLogin.setRequestHeader("Content-Type", "application/json");
    xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send(dataLogin);
  };

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  handleClickShowLoginPassword = () => {
    let currentState = this.state;
    this.setState({ showLoginPassword: !currentState.showLoginPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /*register handlers */

  registerClickHandler = () => {
    this.state.firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastname === ""
      ? this.setState({ lastnameRequired: "dispBlock" })
      : this.setState({ lastnameRequired: "dispNone" });
    this.state.email === ""
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });
    this.state.registerPassword === ""
      ? this.setState({ registerPasswordRequired: "dispBlock" })
      : this.setState({ registerPasswordRequired: "dispNone" });
    this.state.mobile === ""
      ? this.setState({ mobileRequired: "dispBlock" })
      : this.setState({ mobileRequired: "dispNone" });

    if (
      this.state.email === "" ||
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.mobile === "" ||
      this.state.registerPassword === ""
    ) {
      return;
    }

    //xhr for registration

    let dataSignup = JSON.stringify({
      email_address: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      mobile_number: this.state.mobile,
      password: this.state.registerPassword,
    });

    let xhrSignup = new XMLHttpRequest();
    let that = this;
    xhrSignup.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          registrationSuccess: true,
        });
        console.log(this.responseText);
      }
    });

    xhrSignup.open("POST", this.props.baseUrl + "signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.send(dataSignup);
  };

  inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value });
  };

  inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
  };

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  inputRegisterPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
  };

  inputmobileChangeHandler = (e) => {
    this.setState({ mobile: e.target.value });
  };

  handleClickShowRegisterPassword = () => {
    let currentState = this.state;
    this.setState({ showRegisterPassword: !currentState.showRegisterPassword });
  };

  logoutHandler = (e) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    this.setState({
      loggedIn: false,
    });
  };

  render() {
    return (
      <div>
        <header className="app-header">
          <img className="app-logo" src={logo} alt="logo" />
          {!this.state.loggedIn ? (
            <div className="login-button">
              <Button
                variant="contained"
                color="default"
                onClick={this.openModalHandler}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="login-button">
              <Button
                variant="contained"
                color="default"
                onClick={this.logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}

          {this.props.showBookShowButton === "true" && !this.state.loggedIn ? (
            <div className="bookshow-button">
              <Button
                variant="contained"
                color="primary"
                onClick={this.openModalHandler}
              >
                Book Show
              </Button>
            </div>
          ) : (
            ""
          )}

          {this.props.showBookShowButton === "true" && this.state.loggedIn ? (
            <div className="bookshow-button">
              <Link to={"/bookshow/" + this.props.id}>
                <Button variant="contained" color="primary">
                  Book Show
                </Button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs
            value={this.state.value}
            onChange={this.tabChangeHandler}
            className="tabs"
          >
            <Tab label="Login"></Tab>
            <Tab label="Register"></Tab>
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUsernameChangeHandler}
                ></Input>
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required className="password-inp-width">
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type={this.state.showLoginPassword ? "text" : "password"}
                  value={this.state.loginPassword}
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowLoginPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showLoginPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                ></Input>
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {this.state.loggedIn === true && (
                <FormControl>
                  <span className="successText">Login Successful!</span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}

          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  firstname={this.state.firstname}
                  onChange={this.inputFirstNameChangeHandler}
                ></Input>
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  lastname={this.state.lastname}
                  onChange={this.inputLastNameChangeHandler}
                ></Input>
                <FormHelperText className={this.state.lastnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                ></Input>
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required className="password-inp-width">
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type={this.state.showRegisterPassword ? "text" : "password"}
                  value={this.state.registerPassword}
                  registerpassword={this.state.registerPassword}
                  onChange={this.inputRegisterPasswordChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowRegisterPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showRegisterPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                ></Input>
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
                <Input
                  id="mobile"
                  type="number"
                  mobile={this.state.mobile}
                  onChange={this.inputmobileChangeHandler}
                ></Input>
                <FormHelperText className={this.state.mobileRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {this.state.registrationSuccess === true && (
                <FormControl>
                  <span className="successText">
                    Registration Successful. Please Login!
                  </span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerClickHandler}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;
