import React, { Component } from 'react';
import './Tooltip.css';

class Tooltip extends Component {
  render() {
    var cardStyle = {
      height: 80,
      width: 200,
      padding: 8,
      backgroundColor: "#cccccc",
      border: "1px solid #999999",
      fontSize: 12,
      lineHeight: "14px",
      color: "#000",
      position: "absolute",
      zIndex: 1
    };

    return(
      <div style={cardStyle}  className="tooltip">
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;
