import React, { Component } from 'react';
import Neighborhood from '../Neighborhood/Neighborhood';
import sample from 'lodash/sample';
import { Button } from 'semantic-ui-react'
import './Town.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      neighborhoods: []
    };

    this.neighborhoodsPerTown = 25;
    this.neighborhoodRefs = [];
  }

  setNeighborhoodRef = (ref) => {
    this.neighborhoodRefs.push(ref);
  }

  componentDidMount() {
    let neighborhoods = [];
    for (var i = 0; i < this.neighborhoodsPerTown; i++) {
      neighborhoods.push(
        <Neighborhood
          ref={this.setNeighborhoodRef}
          key={i}
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
