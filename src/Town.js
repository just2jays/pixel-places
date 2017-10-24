import React, { Component } from 'react';
import Neighborhood from './Neighborhood'
import './App.css';

class Town extends Component {
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

        var homes = [];
        for (var i = 0; i < 25; i++) {
            homes.push(<Neighborhood key={i}></Neighborhood>);
        }

        return(
            <div style={cardStyle}  className="town">
                {homes}
            </div>
        );
    }
}

export default Town;
