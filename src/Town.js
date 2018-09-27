import React, { Component } from 'react';
import Neighborhood from './Neighborhood'
import './App.css';

class Town extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

    };
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

    var neighborhoods = [];
    for (var i = 0; i < 25; i++) {
      neighborhoods.push(<Neighborhood key={i} />);
    }

    return(
      <div style={cardStyle}  className="town">
        {neighborhoods}
      </div>
    );
  }
}

export default Town;
