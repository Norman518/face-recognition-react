import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ProfileIcon extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      btnDropleft: !prevState.btnDropleft
    }));
  };

  /*  toggle = () => {
    this.setState({ btnDropleft: !this.state.btnDropleft });
  }; */

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown
          direction="left"
          isOpen={this.state.btnDropleft}
          toggle={() => {
            this.setState({ btnDropleft: !this.state.btnDropleft });
          }}
        >
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3f3abNEmRxqBwGyfsX6KLBrvvPop7AMELZI-eQQ1frhbjT2axA"
              className="br-100 ba h3 w3 dib"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.props.toggleModal}>
              View Profile
            </DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange("signout")}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
