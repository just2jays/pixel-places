import React, { Component } from 'react';
import Town from './Town/Town';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighborhoods: [],
      houses: []
    };

    this.onNeighborhoodsGenerated = this.onNeighborhoodsGenerated.bind(this);
    this.onHousesGenerated = this.onHousesGenerated.bind(this);
  }

  onNeighborhoodsGenerated(neighborhoods) {
    this.setState({
      neighborhoods: neighborhoods
    })
  }

  onHousesGenerated(houses) {
    // console.log(houses);
    this.setState({
      houses: [...this.state.houses, ...houses]
    })
  }

  render() {
    return (
      <Town
        onNeighborhoodsGenerated={this.onNeighborhoodsGenerated}
        onHousesGenerated={this.onHousesGenerated}
      />
    );
  }
}

export default App;
