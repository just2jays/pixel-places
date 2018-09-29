import React, { Component } from 'react';
import House from '../House/House';
import isEmpty from 'lodash/isEmpty';
import './Neighborhood.css';

class Neighborhood extends Component {
  constructor(props){
    super(props);
    this.state = {
      grassType: this.generateColor(),
      homes: [],
      showInfo: false
    }

    this.hoodElement = React.createRef();

    this.houseStatusChanged = this.houseStatusChanged.bind(this);
    this.toggleNeighborhoodInfo = this.toggleNeighborhoodInfo.bind(this);
  }

  componentDidMount() {
    let homes = [];
    for (var i = 0; i < 100; i++) {
      homes.push(
        <House
          key={i}
          neighborhood={this.hoodElement}
          houseChanged={this.houseStatusChanged}
        />
      );
    }
    this.setState({
      homes: homes
    });

    this.props.onHousesGenerated(homes);
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

  houseStatusChanged(house) {
    
  }

  toggleNeighborhoodInfo(){
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  render() {
    if(isEmpty(this.state.homes)) return null;

    var cardStyle = {
      height: 100,
      width: 100,
      padding: 0,
      display: "inline-block",
      cursor: "crosshair",
      backgroundColor: this.state.grassType
    };

    console.log(this.state.homes);

    return(
      <div
        ref={this.hoodElement}
        style={cardStyle} 
        className="neighborhood"
        onClick={this.toggleNeighborhoodInfo}
      >
        {this.state.homes}
        <div className={`neighborhood-info ${this.state.showInfo ? 'show-info' : ''}`}>

        </div>
      </div>
    );
  }
}

export default Neighborhood;
