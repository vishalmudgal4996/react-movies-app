import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="login-button">
          <Button variant="contained">Login</Button>
        </div>
      </header>
    );
  }
}

export default Header;
