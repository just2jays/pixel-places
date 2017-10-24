import React, { Component } from 'react';
import House from './House'
import './App.css';

class Neighborhood extends Component {
  generateColor() {
      return '#' +  Math.random().toString(16).substr(-6);
  }

  render() {
      var cardStyle = {
          height: 100,
          width: 100,
          padding: 0,
          backgroundColor: this.generateColor(),
          display: "inline-block",
          WebkitFilter: "drop-shadow(0px 0px 5px #666)",
          filter: "drop-shadow(0px 0px 5px #666)"
      };

      var homes = [];
      for (var i = 0; i < 100; i++) {
          homes.push(<House key={i}></House>);
      }

      return(
          <div style={cardStyle}  className="neighborhood">
              {homes}
          </div>
      );
  }
}

export default Neighborhood;
