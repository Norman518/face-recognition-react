import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Rank from "./components/Rank/Rank.js";
import "tachyons";
import Particles from "react-particles-js";


import Clarifai from 'clarifai';
const app = new Clarifai.App({
  apiKey: "ab57f32e77784ec78903e6058d77a343"
});

const particleOptions = {
  particles: {
    number: {
      value: 30,
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
    this.state = { input: '',
  imageURL: '' };
  }

  onInputChange = event => {
  this.setState({input: event.target.value});
  };
  onBtnSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
 this.state.input
      )
      .then(
        function(response) {
     console.log(response);
        },
        function(err) {
          // there was an error}
        }
      );
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onBtnSubmit={this.onBtnSubmit}
        />
    
      
        <FaceRecognition imageURL={this.state.imageURL}/> 
      </div>
    );
  }
}

export default App;
