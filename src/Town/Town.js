import React, { Component } from 'react';
import Neighborhood from '../Neighborhood/Neighborhood';
import './Town.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      neighborhoods: []
    };

    this.townElement = React.createRef();
  }

  componentDidMount() {
    let neighborhoods = [];
    for (var i = 0; i < 25; i++) {
      neighborhoods.push(
        <Neighborhood
          key={i}
          town={this.townElement}
        />
      );
    }
    this.setState({
      neighborhoods: neighborhoods
    });

    this.props.onNeighborhoodsGenerated(neighborhoods);
  }

  render() {
    var cardStyle = {
      height: 500,
      width: 500,
      padding: 0,
      backgroundColor: "#999",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      fontSize: 0
    };

    return(
      <div
        ref={this.townElement}
        style={cardStyle}
        className="town"
      >
        {this.state.neighborhoods}
      </div>
    );
  }
}

export default Town;
