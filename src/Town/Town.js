import React, { Component } from 'react';
import random from 'lodash/random';
import Neighborhood from '../Neighborhood/Neighborhood';
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
          ref={this.establishNeighborhoodReference}
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

    this.props.onNeighborhoodsGenerated(neighborhoods);
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
      <div className="globe">
        <div className="town-container">
          {this.state.neighborhoods}
          <div className="basic-control-panel" style={{marginTop: '40px'}}>
            <button onClick={this.windsOfChange}>How are you?</button>
            <button onClick={this.powerOutage}>Oops...</button>
            <button onClick={this.takeChance}>Chance!</button>
            <div>
              <div>Simulation Speed: <span>{this.state.simSpeed}</span></div>
              <div>
                <button onClick={this.increaseSimSpeed}>></button>
              </div>
            </div>
          </div>
        </div>
        <div className="town-crier">
          <ul>
          {
            this.state.events.slice(0).reverse().map((eventObject, index) => {
              return (
                <li
                  // data-neighborhood={event.neighborhood}
                  onClick={() => {
                    eventObject.neighborhood.locateNeighborhood();
                    if(typeof eventObject.house !== 'undefined'){
                      eventObject.house.locateHouse();
                    }
                  }}
                >
                  {eventObject.message}
                </li>
              );
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default Town;
