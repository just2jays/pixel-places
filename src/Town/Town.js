import React, { Component } from 'react';
import random from 'lodash/random';
import Neighborhood from '../Neighborhood/Neighborhood';
import './Town.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      neighborhoods: []
    };

    // binds
    this.generateNeighborhoods = this.generateNeighborhoods.bind(this);
    this.powerOutage = this.powerOutage.bind(this);

    // vars
    this.neighborhoodsPerTown = 25;
    this.defaultTimePeriod = 1000; // milliseconds per period (lower == faster progress)
    this.neighborhoodRefs = [];
  }

  componentDidMount() {
    this.generateNeighborhoods();
  }

  // componentWillUnmount() {
  //   // Don't check
  //   clearTimeout(this.checkAwakeTimeout);
  // }

  establishNeighborhoodReference = (ref) => {
    this.neighborhoodRefs.push(ref);
  };

  // set() {
  //   if(random(1)){
  //     this.toggleLights();
  //   }
  //   this.checkAwakeTimeout = setTimeout(
  //     this.checkOwnersAwake,
  //     random(1, 10000)
  //   );
  // }

  generateNeighborhoods() {
    let neighborhoods = [];
    for (var i = 0; i < this.neighborhoodsPerTown; i++) {
      neighborhoods.push(
        <Neighborhood
          ref={this.establishNeighborhoodReference}
          key={i}
          onHoodChange={this.townChanged}
          {...this.props}
        />
      );
    }
    this.setState({
      neighborhoods: neighborhoods
    });

    this.props.onNeighborhoodsGenerated(neighborhoods);
  }

  getAllNeighborhoods() {

  }

  getOverallHappiness() {

  }

  powerOutage() {
    this.neighborhoodRefs[random(this.neighborhoodsPerTown - 1)].homeRefs.forEach((home, index) => {
      home.turnOffLights();
    });
  }

  render() {
    console.log(this.neighborhoodRefs);
    return(
      <div className="town-container">
        {this.state.neighborhoods}
        <p className="basic-control-panel" style={{marginTop: '20px'}}>
          <button onClick={this.powerOutage}>hahaha!</button>
        </p>
      </div>
      
    );
  }
}

export default Town;
