import React, { Component } from 'react';
import random from 'lodash/random';
import './App.css';

class House extends Component {
  constructor(props){
    super(props);
    
    var lightsOn = random(1);

    this.state = {
      lightsOn: lightsOn,
      lightColor: this.generateColor(),
      ownerAwake: lightsOn ? true : false
    };

    this.checkAwakeTimeout = undefined;
    this.checkAwakeEvery = random(100, 1000); // milliseconds
    
    // bindings
    this.toggleLights = this.toggleLights.bind(this);
    this.checkOwnersAwake = this.checkOwnersAwake.bind(this);
  }

  componentDidMount() {
    this.checkOwnersAwake();
  }

  componentWillUnmount() {
    clearTimeout(this.lightInterval);
  }

  checkOwnersAwake() {
    if(random(1)){
      this.toggleLights();
    }
    setTimeout( this.checkOwnersAwake, random(1, 10000));
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
