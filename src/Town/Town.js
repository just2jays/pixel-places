import React, { Component } from 'react';
import Neighborhood from '../Neighborhood/Neighborhood';
import './Town.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      neighborhoods: []
    };

    this.neighborhoodsPerTown = 25;
  }

  componentDidMount() {
    let neighborhoods = [];
    for (var i = 0; i < this.neighborhoodsPerTown; i++) {
      neighborhoods.push(
        <Neighborhood
          key={i}
          {...this.props}
        />
      );
    }
    this.setState({
      neighborhoods: neighborhoods
    });

    this.props.onNeighborhoodsGenerated(neighborhoods);
  }

  render() {
    return(
      <div className="town-container">
        {this.state.neighborhoods}
      </div>
    );
  }
}

export default Town;
