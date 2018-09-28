import React, { Component } from 'react';
import House from '../House/House';
import isEmpty from 'lodash/isEmpty';
import './Neighborhood.css';

class Neighborhood extends Component {
  constructor(props){
    super(props);
    this.state = {
      homes: []
    }

    this.hoodElement = React.createRef();
  }

  componentDidMount() {
    let homes = [];
    for (var i = 0; i < 100; i++) {
      homes.push(
        <House
          key={i}
          neighborhood={this.hoodElement}
        />
      );
    }
    this.setState({
      homes: homes
    });
  }

  generateColor() {
      // Random shade of green (ala grass)
      var max = 150;
      var min = 100;
      var green = Math.floor(Math.random() * (max - min + 1)) + min;
      return `rgb(0, ${green}, 0)`;
      
      // Random color in the hexadecimal range
      // return '#' +  Math.random().toString(16).substr(-6);
  }

  render() {
    if(isEmpty(this.state.homes)) return null;

    var cardStyle = {
      height: 100,
      width: 100,
      padding: 0,
      backgroundColor: this.generateColor(),
      display: "inline-block",
      cursor: "crosshair"
    };

    return(
      <div
        ref={this.hoodElement}
        style={cardStyle} 
        className="neighborhood"
      >
        {this.state.homes}
      </div>
    );
  }
}

export default Neighborhood;
