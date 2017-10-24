import React, { Component } from 'react';
import './App.css';

class House extends Component {
  generateColor() {
      return '#' +  Math.random().toString(16).substr(-6);
  }

  render() {
      var squareStyle = {
          height: 6,
          width: 6,
          display: "inline-block",
          margin: 2,
          backgroundColor: this.generateColor()
      }

      return(
          <div style={squareStyle} className="house"></div>
      );
  }
}

export default House;
