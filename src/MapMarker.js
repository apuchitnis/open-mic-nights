import React, { useState, useEffect } from "react";
import { PiMicrophoneStageFill } from "react-icons/pi";

class MapMarker extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const markerStyle = {
        height: 25,
        width: 25,
        zIndex: 10,
        cursor: "pointer",
      };
      return (
        <div >
          <PiMicrophoneStageFill style={markerStyle} className={
            this.props.status === "Active"
              ? "is-link"
              : "is-danger"
          }  />
          {this.props.show && <InfoWindow name={this.props.name} address={this.props.address} weekday={this.props.weekday}  status={this.props.status}/>}
        </div>
      );
    }
  }
  
const InfoWindow = (props) => {
    const { name, address,  weekday} = props;
    const infoWindowStyle = {
      position: "relative",
      bottom: 50,
      left: "-45px",
      textAlign: "center",
      width: 220,
      backgroundColor: "white",
      boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
      padding: 10,
      fontSize: 14,
      zIndex: 100,
      borderRadius: "25px",
    };
  
    return (
      <div style={infoWindowStyle}>
        <div style={{ fontSize: 14 }}>{name} </div>
        <div style={{ fontSize: 10 }}>{weekday} at {address}</div>
      </div>
    );
  };
  

  export default MapMarker;