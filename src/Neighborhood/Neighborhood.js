import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import House from '../House/House';
import './Neighborhood.css';

class Neighborhood extends Component {
  constructor(props){
    super(props);
    this.state = {
      grassType: this.generateColor(),
      homes: [],
      showInfo: false,
      earningsPerPeriod: '1000',
      powerOn: true,
      overallHappiness: 5 // on a scale of 1-10
    }

    // refs
    this.hoodElement = React.createRef();

    // binds
    this.toggleNeighborhoodInfo = this.toggleNeighborhoodInfo.bind(this);
    this.generateHouses = this.generateHouses.bind(this);
    this.increaseEarningsPerPeriod = this.increaseEarningsPerPeriod.bind(this);
    this.decreaseEarningsPerPeriod = this.decreaseEarningsPerPeriod.bind(this);
    this.neighborhoodWatch = this.neighborhoodWatch.bind(this);

    // vars
    this.homeRefs = [];
  }

  componentDidMount() {
    this.generateHouses(); // Generate initial set of homes
  }

  establishHomeReference = (ref) => {
    this.homeRefs.push(ref); // Create array of `House` references
  };

  generateHouses() {
    let homes = [];
    for (var i = 0; i < 100; i++) {
      homes.push(
        <House
          ref={this.establishHomeReference}
          key={i}
          neighborhood={this.hoodElement}
          onUpdate={this.neighborhoodWatch}
        />
      );
    }
    this.setState({
      homes: homes
    });

    this.props.onHousesGenerated(homes);
  }

  neighborhoodWatch(updatedState){
    let overallHappiness;
    overallHappiness = reduce(this.homeRefs, (home, n) => {
      console.log(home, n);
      return 0;
    }, 0);
    console.log(overallHappiness);
  }

  generateColor() {
      // Random shade of green (ala grass)
      var max = 150;
      var min = 100;
      var green = Math.floor(Math.random() * (max - min + 1)) + min;
      return `rgb(0, ${green}, 0)`;
      
      // Random color in the hexadecimal range
      // return '#' +  Math.random().toString(16).substr(-6);
  }


  toggleNeighborhoodInfo(){
    this.setState({
      showInfo: !this.state.showInfo
    });
  }

  increaseEarningsPerPeriod() {
    this.setState({
      earningsPerPeriod: (this.state.earningsPerPeriod + 25)
    });
  }

  decreaseEarningsPerPeriod() {
    this.setState({
      earningsPerPeriod: (this.state.earningsPerPeriod - 25)
    });
  }

  render() {
    if(isEmpty(this.state.homes)) return null;

    var cardStyle = {
      height: 100,
      width: 100,
      padding: 0,
      display: "inline-block",
      cursor: "crosshair",
      backgroundColor: this.state.grassType
    };

    return(
      <div
        ref={this.hoodElement}
        style={cardStyle} 
        className="neighborhood"
        onClick={this.toggleNeighborhoodInfo}
      >
        {this.state.homes}
        <div className={`neighborhood-info ${this.state.showInfo ? 'show-info' : ''}`}>

        </div>
      </div>
    );
  }
}

export default Neighborhood;
