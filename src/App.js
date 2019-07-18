import React, { Component } from "react";
import "./App.css";
import "tachyons";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "ab57f32e77784ec78903e6058d77a343"
});

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = { input: "", imageURL: "", box: {}, route: "signin" };
  }
  calculateBox = data => {
    const boxCoordinates =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: boxCoordinates.left_col * width,
      top: boxCoordinates.top_row * height,
      right: width - boxCoordinates.right_col * width,
      bottom: height - boxCoordinates.bottom_row * height
    };
  };
  displayBox = box => {
    this.setState({ box });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onBtnSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayBox(this.calculateBox(response)))
      .catch(err => console.log(err));
  };
  onRouteChange = route => {
    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} />{" "}
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />{" "}
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
