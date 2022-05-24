import React, { Component } from 'react';
import random from 'lodash/random';
import Neighborhood from '../Neighborhood/Neighborhood';
import sample from 'lodash/sample';
import { Button } from 'semantic-ui-react'
import './Town.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      neighborhoods: [],
      events: [],
      simSpeed: 1 // speed of simulation (1 = normal/real-time)
    };
    
    // binds
    this.generateNeighborhoods = this.generateNeighborhoods.bind(this);
    this.powerOutage = this.powerOutage.bind(this);
    this.windsOfChange = this.windsOfChange.bind(this);
    this.tellTheTown = this.tellTheTown.bind(this);
    this.takeChance = this.takeChance.bind(this);
    this.increaseSimSpeed = this.increaseSimSpeed.bind(this);
    this.neighborhoodsPerTown = 25;
    this.neighborhoodRefs = [];
  }

  setNeighborhoodRef = (ref) => {
    this.neighborhoodRefs.push(ref);

    // vars
    this.neighborhoodsPerTown = 2;
    this.defaultTimePeriod = 1000; // milliseconds per period (lower == faster progress)
    this.neighborhoodRefs = [];

  }

  componentDidMount() {
    this.generateNeighborhoods(); // generate initial neighborhoods
  }

  componentDidUpdate() {
    console.log(`TOWN UPDATED speed to ${this.state.simSpeed}!`);
  }

  establishNeighborhoodReference = (ref) => {
    this.neighborhoodRefs.push(ref);
  };

  tellTheTown(event) {
    this.setState({
      events: [...this.state.events, event]
    });
  }

  increaseSimSpeed() {
    if(this.state.simSpeed >=5) {
      console.log('Sim speed at max (5x)');
      return false;
    }

    this.setState({
      simSpeed: this.state.simSpeed + 1
    });
  }

  generateNeighborhoods() {
    let neighborhoods = [];
    for (var i = 0; i < this.neighborhoodsPerTown; i++) {
      neighborhoods.push(
        <Neighborhood
          ref={this.setNeighborhoodRef}
          key={i}
          town={this}
          simSpeed={this.state.simSpeed}
          onUpdate={this.tellTheTown}
          {...this.props}
        />
      );
    }
    this.setState({
      neighborhoods: neighborhoods
    });
  }

  randomNeighborhoodPowerOutage = () => {
    let randomHood = sample(this.neighborhoodRefs);
    console.log(randomHood);
    randomHood.shutOffPower();
  }

  totalEnergyUsage = () => {
    let totalEnergy = 0;
    this.neighborhoodRefs.map((hood) => {
      totalEnergy += hood.getHomesWithPowerOn();
    })
  }

  /*
  * TOWN EXPERIMENTS
  */
  powerOutage() {
    this.neighborhoodRefs[random(this.neighborhoodsPerTown - 1)].homeRefs.forEach((home, index) => {
      home.turnOffLights();
    });
  }

  windsOfChange() {
    let randomHood = this.neighborhoodRefs[random(this.neighborhoodsPerTown - 1)];
    let randomHome = randomHood.homeRefs[randomHood.homeRefs.length - 1];
    let goodWinds = random() ? true : false;
    if(goodWinds) {
      randomHome.increaseHappiness();
    }else{
      randomHome.decreaseHappiness();
    }
  }

  takeChance() {
    let randomHood = this.neighborhoodRefs[random(this.neighborhoodsPerTown - 1)];
    randomHood.generateStrayAnimal();
  }

  render() {
    return(
      <React.Fragment>
        <div className="town-container">
          {this.state.neighborhoods}
        </div>
        <div className="town-info-bar">
          <p># of Neighborhoods:</p>
          <p># of Homes:</p>
          <p>Power being used:</p>
        </div>
        <div className="control-panel">
          <Button
            onClick={this.randomNeighborhoodPowerOutage}
          >
            <span role="img" aria-label="lightning-bolt">⚡️</span>Random Power Outage
          </Button>
        </div>
      </React.Fragment>

    );
  }
}

export default Town;
