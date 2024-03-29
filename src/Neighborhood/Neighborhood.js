import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import random from 'lodash/random';
import sample from 'lodash/sample';
import House from '../House/House';
import './Neighborhood.css';

class Neighborhood extends Component {
  constructor(props){
    super(props);
    this.state = {
      grassType: undefined,
      homes: [],
      showInfo: false,
      homeRefs: []
      earningsPerPeriod: '1000',
      powerOn: true,
      overallHappiness: 500, // default `House` happiness value * num of homes in neighborhood
      strayAnimals: [],
      locationRequested: false
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
    this.happinessCheck = this.happinessCheck.bind(this);
    this.strayAnimalCheck = this.strayAnimalCheck.bind(this);
    this.fetchRandomHouse = this.fetchRandomHouse.bind(this);
    this.locateNeighborhood = this.locateNeighborhood.bind(this);
    this.removeNeighborhoodLocator = this.removeNeighborhoodLocator.bind(this);

    // vars
    this.town = props.town;
    this.name = this.generateNeighborhoodName();
    this.homeRefs = [];
    this.happinessThreshold = 0.5; // Threshold to determine happiness
    this.neighborhoodWatchInterval = 60000; // Interval to run neighborhood watch (in milliseconds)
  }

  setHouseRef = (ref) => {
    console.log(this.state.homeRefs);
    this.setState({
      homeRefs: [...this.state.homeRefs, ref]
    })
  }

  componentDidMount() {
    this.generateGrass(); // Generate initial neighborhood lawns
    this.generateHouses(); // Generate initial homes in neighborhood

    

    // initiate "Neighborhood Watch"
    this.neighborhoodWatchTimer = setInterval(
      this.neighborhoodWatch,
      (this.neighborhoodWatchInterval/this.town.state.simSpeed)  // next check interval (in milliseconds)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.simSpeed,nextProps.simSpeed);
    if(
      this.state.overallHappiness !== nextState.overallHappiness ||
      this.state.homes !== nextState.homes ||
      this.state.grassType !== nextState.grassType ||
      this.state.strayAnimals.length !== nextState.strayAnimals.length ||
      this.state.locationRequested !== nextState.locationRequested ||
      this.props.simSpeed !== nextProps.simSpeed
    ) {
      return true;
    }else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.simSpeed !== this.props.simSpeed) {
      console.log('sim speed changed!');
    }

    if(prevState.overallHappiness !== this.state.overallHappiness) {
      // Handle change in overall `Neighborhood` happiness
      let changeType = this.state.overallHappiness < prevState.overallHappiness ? 'increased' : 'decreased';
      let overall = this.state.overallHappiness/500 >= 0.5 ? 'happy' : 'sad';
      (() => {
        this.props.onUpdate({
          neighborhood: this,
          message: `${this.name} ${changeType} in sadness and is overall ${overall}`
        });
        this.handleChangeInHappiness();
      })();
    }

    if(prevState.strayAnimals.length !== this.state.strayAnimals.length) {
      // Handle change in `Neighborhood` stray animals
      (() => {
        // this.props.onUpdate(`There's a stray ${this.state.strayAnimals[this.state.strayAnimals.length - 1].type} wandering around ${this.name}`);
        // this.handleChangeInHappiness();
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

          ref={this.setHouseRef}
          key={i}
          neighborhood={this}
          onUpdate={this.neighborhoodWatch}
        />
      );
    }
    this.setState({
      homes: homes
    });
  }

  shutOffPower = () => {
    console.log(this.state.homeRefs);
    this.state.homeRefs.map((home) => 
      home.turnOffTheLights()
    )
  }

  getHomesWithPowerOn = () => {

  }

  neighborhoodWatch(updatedState){
    this.happinessCheck(); // Check for changes in overall Happiness
    this.strayAnimalCheck(); // Check for changes in overall stray animal population
  }

  happinessCheck() {
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

  strayAnimalCheck() {
    let percentChanceNewStray = 10; // % chance of new stray animal in neighborhood
    let percentChanceAdoption = 10; // % chance a house in neighborhood adopts a stray animal
    
    // Check for new strays
    if(random(1, 100) <= percentChanceNewStray){
      let strayAnimal = this.generateStrayAnimal();
      this.setState({
        strayAnimals: [...this.state.strayAnimals, strayAnimal]
      }, () =>{
        // this.props.onUpdate(`A ${strayAnimal.color} ${strayAnimal.type} is loose in ${this.name}`);
        this.props.onUpdate({
          neighborhood: this,
          message: `A ${strayAnimal.color} ${strayAnimal.type} is loose in ${this.name}`
        });
      });
    }

    // Check for new adoptions
    if(this.state.strayAnimals.length > 0){
      if(random(1, 100) <= percentChanceAdoption){
        let currentStrays = [...this.state.strayAnimals];
        let adoptedStray = currentStrays.splice(random(currentStrays.length - 1), 1)[0];
        this.setState({
          strayAnimals: currentStrays
        }, () =>{
          let adoptedHouse = this.fetchRandomHouse();
          adoptedHouse.addNewPet(adoptedStray);
          // this.props.onUpdate(`The ${adoptedStray.color} ${adoptedStray.type} in ${this.name} has been adopted by ${this.fetchRandomHouse().householdName}`);
          this.props.onUpdate({
            house: adoptedHouse,
            neighborhood: this,
            message: `The ${adoptedStray.color} ${adoptedStray.type} in ${this.name} has been adopted by ${this.fetchRandomHouse().householdName}`
          });
        });
      }
    }
  }

  generateStrayAnimal(){
    // Generate a random stray animal
    let animalType = ['cat', 'dog', 'lizard', 'ostrich'];
    let animalColor = ['red', 'yellow', 'brown', 'green'];
    let strayAnimal = {
      type: sample(animalType),
      color: sample(animalColor)
    }

    return strayAnimal;
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

  fetchRandomHouse() {
    return sample(this.homeRefs);
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

  locateNeighborhood() {
    this.setState({
      locationRequested: true
    }, () => {
      setTimeout(
        () => {
          this.setState({
            locationRequested: false
          });
        }, 5000
      );
    });
  }

  removeNeighborhoodLocator() {
    this.setState({
      locationRequested: false
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
      backgroundColor: this.state.grassType,
      filter: this.state.locationRequested ? 'brightness(0.6)' : 'initial'
    };

    
    this.state.homeRefs.map((house) => {
      console.log(house.state.lightsOn);
    })


    return(
      <div
        ref={this.hoodElement}
        style={cardStyle} 
        className="neighborhood"
        onClick={this.removeNeighborhoodLocator}
      >
        {this.state.homes}
        <div className={`neighborhood-info ${this.state.showInfo ? 'show-info' : ''}`}>

        </div>
      </div>
    );
  }
}

export default Neighborhood;
