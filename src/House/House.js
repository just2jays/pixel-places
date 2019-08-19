import React, { Component } from 'react';
import random from 'lodash/random';
import Tooltip from '../Tooltip/Tooltip';
import './House.css';

class House extends Component {
  constructor(props){
    super(props);
    
    var lightsOn = random(1);
    var ownsTelevision = random(1);

    this.state = {
      size: 3,
      lightsOn: lightsOn,
      lightColor: this.generateColor(),
      ownsTelevision: ownsTelevision,
      showingInfo: false,
      happiness: 5 // on a scale of 1-10
    };

    this.checkAwakeTimeout = undefined;

    // refs
    this.tooltip = React.createRef();
    
    // bindings
    this.toggleLights = this.toggleLights.bind(this);
    this.checkOwnersAwake = this.checkOwnersAwake.bind(this);
    this.showHouseInfo = this.showHouseInfo.bind(this);
    this.hideHouseInfo = this.hideHouseInfo.bind(this);
    this.getHappiness = this.getHappiness.bind(this);
    this.increaseHappiness = this.increaseHappiness.bind(this);
    this.decreaseHappiness = this.decreaseHappiness.bind(this);
  }

  componentDidMount() {
    this.checkOwnersAwake();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true; // for now...
  }

  componentDidUpdate(prevProps, prevState){
    // if(this.state.lightsOn !== prevState.lightsOn){
    //   // this.props.houseChanged('lights');
    // }
    // // this.props.houseChanged();
    this.props.onUpdate(this.state);
  }

  componentWillUnmount() {
    // Don't check
    clearTimeout(this.checkAwakeTimeout);
  }

  checkOwnersAwake() {
    let percentChanceAwake = 10; // ...out of a random integer between 1-100
    if(random(1, 100) <= percentChanceAwake){
      this.toggleLights();
    }
    this.checkAwakeTimeout = setTimeout(
      this.checkOwnersAwake,
      random(1, 10000) // check again at random interval between immediately and 10 seconds
    );
  }

  getState

  /*
  * HAPPINESS
  */
  getHappiness() {
    return this.state.happiness;
  }
  increaseHappiness(level) {
    if('above some level' === 'NO'){
      // Ping my `Neighborhood` to update happiness chart
    }

    this.setState({
      happiness: (this.state.happiness + 1)
    });
  }
  decreaseHappiness(level) {
    if('below some level' === 'NO'){
      // Ping my `Neighborhood` to update happiness chart
    }

    this.setState({
      happiness: (this.state.happiness - 1)
    });
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  /*
  * LIGHTS
  */
  getLightStatus() {
    return this.state.lightsOn ? 'on' : 'off';
  }
  toggleLights() {
    this.setState({
      lightsOn: !this.state.lightsOn
    });
  }
  turnOnLights() {
    this.setState({
      lightsOn: true
    });
  }
  turnOffLights() {
    this.setState({
      lightsOn: false
    });
  }


  showHouseInfo() {
    this.setState({
      showingInfo: true
    });
  }

  hideHouseInfo() {
    this.setState({
      showingInfo: false
    });
  }

  render() {
    const squareStyle = {
      position: 'relative',
      height: 6,
      width: 6,
      display: "inline-block",
      margin: 2,
      backgroundColor: this.state.lightsOn ? this.state.lightColor : '#000',
    }

    const tooltipStyle = {
      display: this.state.showingInfo ? 'inline-block' : 'none'
    }
    
    return(
      <div
        ref={this.props.establishHouseReference}
        className={`house`}
        style={squareStyle}
        onClick={this.toggleLights}
        onMouseOver={this.showHouseInfo}
        onMouseOut={this.hideHouseInfo}
      >
        <div className="tooltip-container" style={tooltipStyle}>
          <Tooltip>
            <div>Awake: {this.state.lightsOn ? '👀' : '💤'}</div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default House;
