import React, { Component } from 'react';
import House from './House'
import './App.css';

class Neighborhood extends Component {
  generateColor() {
      // random shade of green (ala grass)
      var max = 150;
      var min = 100;
      var green = Math.floor(Math.random() * (max - min + 1)) + min;
      return `rgb(0, ${green}, 0)`;
      
      // random color in the hexadecimal range
      // return '#' +  Math.random().toString(16).substr(-6);
  }

  render() {
    var cardStyle = {
      height: 100,
      width: 100,
      padding: 0,
      backgroundColor: this.generateColor(),
      display: "inline-block",
      cursor: "crosshair"
    };

    var homes = [];
    for (var i = 0; i < 100; i++) {
      homes.push(<House key={i} />);
    }

    return(
      <div style={cardStyle}  className="neighborhood">
        {homes}
      </div>
    );
  }
}

export default Neighborhood;
