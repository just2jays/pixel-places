import React, { Component } from 'react';
import './App.css';

class House extends Component {
  constructor(props){
    super(props);
    this.state = {
      lightsOn: Math.random() >= 0.5,
      lightColor: this.generateColor()
    };

    // bindings
    this.toggleLights = this.toggleLights.bind(this);
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  toggleLights() {
    this.setState({
      lightsOn: !this.state.lightsOn
    })
  }

  render() {
    var squareStyle = {
      height: 6,
      width: 6,
      display: "inline-block",
      margin: 2,
      backgroundColor: this.state.lightsOn ? this.state.lightColor : '#000'
    }

    return(
      <div
        className={`house`}
        style={squareStyle}
        onClick={this.toggleLights}
      />
    );
  }
}

export default House;
