import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div>
        <Button variant="contained">Login</Button>
      </div>
    );
  }
}

export default Header;
