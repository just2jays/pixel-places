import React, { Component } from 'react';
import Town from './Town/Town';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighborhoods: []
    };

    this.onNeighborhoodsGenerated = this.onNeighborhoodsGenerated.bind(this);
  }

  onNeighborhoodsGenerated(neighborhoods) {
    this.setState({
      neighborhoods: neighborhoods
    })
  }

  render() {
    return (
      <React.Fragment>
        <Town
          onNeighborhoodsGenerated={this.onNeighborhoodsGenerated}
        />
        <div className='town-info'>
          <span># of neighborhoods: {this.state.neighborhoods.length}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
