import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
const {ApiKey }= require('./constants');

class Map extends React.Component {
    // TODO: turn this into a function
    constructor(props) {
      super(props);
  
      this.state = {
        results: [],
      };
    }
  
    _onChildClick = (key, childProps) => {
      this.setState((state) => {
        let index = state.results.findIndex((e) => e.show);
        if (
          index > 0 &&
          state.results[index].original.RowNumber != parseInt(key)
        ) {
          state.results[index].show = false;
        }
        index = state.results.findIndex(
          (e) => e.original.RowNumber == parseInt(key)
        );
        state.results[index].show = !state.results[index].show; // eslint-disable-line no-param-reassign
  
        const cells = document.querySelectorAll("td");
        var found = null;
        for (var i = 0; i < cells.length; i++) {
          if (cells[i].textContent == state.results[index].original.Name) {
            found = cells[i];
            break;
          }
        }
        found.parentNode.style.backgroundColor = "#fffcb3";
        setTimeout(
          () => (found.parentNode.style.backgroundColor = "white"),
          2000
        );
        found.scrollIntoView({ behavior: "smooth", block: "nearest" });
  
        return { results: state.results };
      });
    };
  
    componentDidUpdate(prevProps) {
      if (this.props.results != prevProps.results) {
        this.setState((_, props) => {
          const newState = props.results.map((result) => ({
            ...result,
            show: false,
          }));
          return { results: newState };
        });
      }
    }
  
    render() {
      return (
        // Important! Always set the container height explicitly
        <div id="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: ApiKey }}
            defaultCenter={{ lat: 45.463336, lng: 9.187174 }}
            defaultZoom={12.8}
            onChildClick={this._onChildClick}
          >
            {this.state.results.map((item) => (
              <MapMarker
                key={item.original.RowNumber}
                lat={item.original.Latitude}
                lng={item.original.Longitude}
                address={item.original.Address}
                weekday={item.original.Weekday}
                name={item.original.Name}
                status={item.original.Status}
                show={item.show}
              />
            ))}
          </GoogleMapReact>
        </div>
      );
    }
  }

  export default Map;