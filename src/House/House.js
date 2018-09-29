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
      lightsOn: lightsOn,
      lightColor: this.generateColor(),
      ownsTelevision: ownsTelevision,
      showingInfo: false
    };

    this.checkAwakeTimeout = undefined;

    // refs
    this.tooltip = React.createRef();
    
    // bindings
    this.toggleLights = this.toggleLights.bind(this);
    this.checkOwnersAwake = this.checkOwnersAwake.bind(this);
    this.showHouseInfo = this.showHouseInfo.bind(this);
    this.hideHouseInfo = this.hideHouseInfo.bind(this);
  }

  componentDidMount() {
    this.checkOwnersAwake();
  }

  componentDidUpdate(){
    // Notify the neighborhood of a change in a home
    this.props.houseChanged(this.state);
  }

  componentWillUnmount() {
    // Don't check
    clearTimeout(this.checkAwakeTimeout);
  }

  checkOwnersAwake() {
    if(random(1)){
      this.toggleLights();
    }
    this.checkAwakeTimeout = setTimeout(
      this.checkOwnersAwake,
      random(1, 10000)
    );
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  toggleLights() {
    this.setState({
      lightsOn: !this.state.lightsOn
    })
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
      <React.Fragment>
        <div
          className={`house`}
          style={squareStyle}
          onClick={this.toggleLights}
          onMouseOver={this.showHouseInfo}
          onMouseOut={this.hideHouseInfo}
        />
        <div className="tooltip-container" style={tooltipStyle}>
          <Tooltip>
            <div>Awake: {this.state.lightsOn ? '👀' : '💤'}</div>
          </Tooltip>
        </div>
      </React.Fragment>
    );
  }
}

export default House;
