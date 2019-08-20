import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import random from 'lodash/random';
import House from '../House/House';
import './Neighborhood.css';

class Neighborhood extends Component {
  constructor(props){
    super(props);
    this.state = {
      grassType: undefined,
      homes: [],
      showInfo: false,
      earningsPerPeriod: '1000',
      powerOn: true,
      overallHappiness: 500, // default `House` happiness value * num of homes in neighborhood
      strayAnimals: []
    }

    // refs
    this.hoodElement = React.createRef();

    // binds
    this.toggleNeighborhoodInfo = this.toggleNeighborhoodInfo.bind(this);
    this.generateHouses = this.generateHouses.bind(this);
    this.increaseEarningsPerPeriod = this.increaseEarningsPerPeriod.bind(this);
    this.decreaseEarningsPerPeriod = this.decreaseEarningsPerPeriod.bind(this);
    this.neighborhoodWatch = this.neighborhoodWatch.bind(this);
    this.generateGrass = this.generateGrass.bind(this);
    this.generateStrayAnimal = this.generateStrayAnimal.bind(this);

    // vars
    this.name = this.generateNeighborhoodName();
    this.homeRefs = [];
    this.happinessThreshold = 0.5; // Threshold to determine happiness
  }

  componentDidMount() {
    this.generateGrass();
    this.generateHouses(); // Generate initial set of homes
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(
      this.state.overallHappiness !== nextState.overallHappiness ||
      this.state.homes !== nextState.homes ||
      this.state.grassType !== nextState.grassType ||
      this.state.strayAnimals.length !== nextState.strayAnimals.length
    ) {
      return true;
    }else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.overallHappiness !== this.state.overallHappiness) {
      // Handle change in overall `Neighborhood` happiness
      let changeType = this.state.overallHappiness < prevState.overallHappiness ? 'increased' : 'decreased';
      let overall = this.state.overallHappiness/500 >= 0.5 ? 'happy' : 'sad';
      (() => {
        this.props.onUpdate(`${this.name} ${changeType} in sadness and is overall ${overall}`)
        this.handleChangeInHappiness();
      })();
    }

    if(prevState.strayAnimals.length !== this.state.strayAnimals.length) {
      // Handle change in `Neighborhood` stray animals
      (() => {
        this.props.onUpdate(`There's a stray ${this.state.strayAnimals[this.state.strayAnimals.length - 1].type} wandering around ${this.name}`);
        this.handleChangeInHappiness();
      })();
    }
  }

  establishHomeReference = (ref) => {
    this.homeRefs.push(ref); // Create array of `House` references
  };

  handleChangeInHappiness() {
    this.generateGrass();
  }

  generateNeighborhoodName() {
    let preName = [
      'Rama',
      'Tama',
      'Sama',
      'Wala',
      'Kimi'
    ];
    let midName = [
      'nala',
      'pili',
      'nuli',
      'lama',
      'geeta'
    ];
    let postName = [
      'luts',
      'runa',
      'kata',
      'paga',
      'duna'
    ];

    return preName[random(preName.length-1)]+midName[random(midName.length-1)]+postName[random(postName.length-1)];
  }

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
    // Get sum of overall happiness of all `Houses` in `Neighborhood`
    let overallHappiness;
    overallHappiness = reduce(this.homeRefs, function(sum, house) {
      return sum + house.state.happiness;
    }, 0);

    if(overallHappiness !== this.state.overallHappiness) {
      this.setState({
        overallHappiness: overallHappiness
      });
    }
  }

  generateStrayAnimal(){
    let animal = {
      type: 'cat'
    };

    this.setState({
      strayAnimals: [...this.state.strayAnimals, animal]
    });
  }

  generateGrass() {
      // Random shade of green (ala grass)
      var max = 250;
      var min = 100;
      var threshold = this.state.overallHappiness/500;
      var red = Math.floor(threshold * (max - min + 1)) + min;
      var green = Math.floor(threshold * (max - min + 1)) + min;

      if(this.state.overallHappiness/500 >= 0.5){
        red = 0;
      }else {
        green = 0;
      }

      this.setState({
        grassType: `rgb(${red}, ${green}, 0)`
      });
      
      // Random color in the hexadecimal range
      // return '#' +  Math.random().toString(16).substr(-6);
  }

  generateTerrain() {

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
        // onClick={this.toggleNeighborhoodInfo}
      >
        {this.state.homes}
        <div className={`neighborhood-info ${this.state.showInfo ? 'show-info' : ''}`}>

        </div>
      </div>
    );
  }
}

export default Neighborhood;
