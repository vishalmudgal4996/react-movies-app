import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

class Header extends Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false, value: 0 };
  }

  openModalHandler = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false, value: 0 });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <header className="app-header">
          <img className="app-logo" src={logo} alt="logo" />
          <div className="login-button">
            <Button variant="contained" onClick={this.openModalHandler}>
              Login
            </Button>
          </div>
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="Login"></Tab>
            <Tab label="Register"></Tab>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default Header;
