import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Entries from "./components/Entries/Entries";
import Particles from "react-particles-js";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
const initialState = {
  input: "",
  imageUrl: "",
  boxes: {},
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://enigmatic-mountain-79795.herokuapp.com/signin", {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`https://enigmatic-mountain-79795.herokuapp.com/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              })
              .catch(console.log);
          }
        });
    }
  }
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateBoxes = data => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    let boxCoordinates = [];
    if (data.outputs[0].data.regions) {
      for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
        boxCoordinates.push({
          left:
            data.outputs[0].data.regions[i].region_info.bounding_box.left_col *
            width,
          top:
            data.outputs[0].data.regions[i].region_info.bounding_box.top_row *
            height,
          right:
            data.outputs[0].data.regions[i].region_info.bounding_box.right_col *
            width,
          bottom:
            data.outputs[0].data.regions[i].region_info.bounding_box
              .bottom_row * height
        });
      }
      return {
        boxCoordinates
      };
    } else {
      alert("Image has no faces!");
      return {
        boxCoordinates
      };
    }
  };
  displayBoxes = boxes => {
    if (boxes) {
      this.setState({ boxes });
    }
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onImgSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //fetch("https://enigmatic-mountain-79795.herokuapp.com/imageurl", {
    fetch("https://enigmatic-mountain-79795.herokuapp.com/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },

      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          //fetch("https://enigmatic-mountain-79795.herokuapp.com/image", {
          fetch("https://enigmatic-mountain-79795.herokuapp.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayBoxes(this.calculateBoxes(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      boxes,
      isProfileOpen,
      user
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />

            <Entries
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImgSubmit={this.onImgSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : route === "signout" ? (
          (sessionStorage.removeItem("token"),
          (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ))
        ) : (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
