import React, { Component } from 'react';
import PropTypes from 'prop-types';
import random from 'lodash/random';
// import Tooltip from '../Tooltip/Tooltip';
import './House.css';

class House extends Component {
  constructor(props){
    super(props);

    this.state = {
      numberOfResidents: random(1, 5), // (int) size of family in the house
      pets: [], // (array) pets in the house
      lightsOn: random(1), // (bool) lights are "on"
      lightColor: this.generateColor(), // hex color value of light display
      ownsTelevision: random(1), // (bool) tv allowed in the household
      happiness: 5, // (int) overall happiness of the house on a scale of 1-10
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
    this.getHappiness = this.getHappiness.bind(this);
    this.increaseHappiness = this.increaseHappiness.bind(this);
    this.decreaseHappiness = this.decreaseHappiness.bind(this);

    // vars
    this.householdName = this.generateHouseholdName();
  }

  componentDidMount() {
    // this.checkOwnersAwake();
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

  generateHouseholdName() {
    let preName = [
      'Gr',
      'At',
      'Br',
      'St',
      'Pl'
    ];
    let midName = [
      'and',
      'on',
      'essa',
      'ara'
    ];
    let postName = [
      'hana',
      'ka',
      'la',
      'ha',
      'ra'
    ];

    return `The ${preName[random(preName.length-1)]+midName[random(midName.length-1)]+postName[random(postName.length-1)]}s`;
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

  /*
  * RESIDENTS
  */
  getNumberOfResidents = () => this.state.numberOfResidents;

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
      happiness: (this.state.happiness + 100)
    });
  }
  decreaseHappiness(level) {
    if('below some level' === 'NO'){
      // Ping my `Neighborhood` to update happiness chart
    }

    this.setState({
      happiness: (this.state.happiness - 100)
    });
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  /*
  * LIGHTS
  */
  getLights() {
    const { lightsOn, lightColor } = this.state;
    return {
      status: lightsOn ? 'on' : 'off',
      color: lightColor
    }
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

  /*
  * PETS
  */
  addNewPet(pet) {
    if (typeof pet === 'undefined') return false;

    this.setState({
      pets: [...this.state.pets, pet]
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
        className={`house`}
        style={squareStyle}
        onClick={this.toggleLights}
        // onMouseOver={this.showHouseInfo}
        // onMouseOut={this.hideHouseInfo}
      >
        {/* <div className="tooltip-container" style={tooltipStyle}>
          <Tooltip>
            <div>Awake: {this.state.lightsOn ? '👀' : '💤'}</div>
          </Tooltip>
        </div> */}
      </div>
    );
  }
}

House.propTypes = {
  onUpdate: PropTypes.func,
  
}

export default House;
