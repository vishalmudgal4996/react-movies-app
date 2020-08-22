import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";
import logo from "../../assets/logo.svg";

class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <img className="app-logo" src={logo} alt="logo" />
        <div className="login-button">
          <Button variant="contained">Login</Button>
        </div>
      </header>
    );
  }
}

export default Header;
