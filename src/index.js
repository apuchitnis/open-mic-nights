import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import './scrollable.css';
import './hover.css'
import { useTable } from 'react-table'

const { GoogleSpreadsheet } = require('google-spreadsheet');

function AppTable() {
  const [data, setData] = useState({ headerValues: null, rows: [], isFetching: false });

  useEffect(() => {
    (async function () {
      try {
        setData({ ...data, isFetching: true });

        const doc = new GoogleSpreadsheet('1uwHo4bGisUiQgwAnkFbVUZG2fabZD-uwaNx4JHlWnSs');
        doc.useApiKey("AIzaSyDWzk5MJLYVpzppXB9xxJWjVJnoe97erbc");
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]
        const rows = await sheet.getRows()

        setData({ headerValues: sheet.headerValues, rows: rows, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ ...data, isFetching: false });
      }
    }());
  }, []);

  const rowsData = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        return data.rows.map((item) => { return { Name: item.Name } })
      }

      return [
        {
          col1: 'Hello',
          col2: 'World',
        },
        {
          col1: 'react-table',
          col2: 'rocks',
        },
        {
          col1: 'whatever',
          col2: 'you want',
        },
      ]
    },
    [data]
  )

  const columns = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        return data.headerValues.map((item) => { return { Header: item, accessor: item }; })
      }

      return [
        {
          Header: 'Column 1',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col2',
        },
      ]
    },
    [data]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: rowsData })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const K_SIZE = 150;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  transform: 'translate(-50%, -100%)',
  //background: 'green',
  transition: 'transform .2s',
  cursor: 'pointer',
  '&hover:': {
    background: 'green',
    transform: 'scale(1.5)',
  },
};

// const greatPlaceStyleHover = {
//   // initially any map object has left top corner at lat lng coordinates
//   // it's on you to set object origin to 0,0 coordinates
//   position: 'absolute',
//   transition: 'transform .2s',

//   // width: K_SIZE,
//   // height: K_SIZE,
//   // left: -K_SIZE / 2,
//   // top: -K_SIZE / 2,
//   cursor: 'pointer',
//   '&:hover': {
//     transform: "scale(1.5)",
//   },
// };

const InfoWindow = (props) => {
  const { name } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {name}
      </div>
    </div>
  );
};

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const style = this.props.$hover ? greatPlaceStyle : greatPlaceStyle;
    // const text = ""//this.props.$hover ? this.props.text : '';
    const img = <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg"></img>;
    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 10,
      width: 10,
      backgroundColor: this.props.show ? 'red' : 'blue',
      cursor: 'pointer',
      zIndex: 10,
    };
    console.log(this.props.show)

    return (
      <div style={markerStyle}/*className="pin"*/>
        {/* {img} */}
        {this.props.show && <InfoWindow name={this.props.name} />}
      </div>
    );
  }
}
const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.Name}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: parseFloat(place.Latitude),
        lng: parseFloat(place.Longitude),
      },
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    }
  }

  _onChildClick = (key, childProps) => {
    console.log(key)
    console.log(childProps)
    console.log(this.state)
    this.setState((state) => {
      const index = state.results.findIndex(e => e._rowNumber == parseInt(key));
      state.results[index].show = !state.results[index].show; // eslint-disable-line no-param-reassign
      return { results: state.results };
    });
    // const markerId = childProps.marker.get('id');
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    // if (this.props.onChildClick) {
    //   this.props.onChildClick(index);
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.places != prevProps.places) {
      this.setState(() => {
        const newPlaces = this.props.places.map(place => ({ ...place, show: false }));
        return { places: newPlaces };
      })
    }
  }

  render() {
    const places = this.state.places;
    console.log(places.length)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '95vh', width: '95vh' }}>
        {(places.length > 0) && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB2xTrXYV7Y6bN1BVVPrt2ZUglBPTZ-2S4' }}
            defaultCenter={{ lat: 51.5074, lng: -0.05 }}
            defaultZoom={14}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}

          // onChildClick={this._onChildClick}
          >
            {/* {this.state.results.map((item) =>
            <MapMarker
              key={item._rowNumber}
              lat={item.Latitude}
              lng={item.Longitude}
              name={item.Name}
              show={item.show}
            />,
          )} */}
          </GoogleMapReact>
        )}
      </div>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleIsActive(e) {
    e.currentTarget.classList.toggle('is-active');
  }

  setButtonText(e, id) {
    document.getElementById(id).textContent = e.target.textContent;
  }

  render() {
    const frequencies = Array.from(new Set(this.props.results.map((item) => item.Frequency)));
    return (
      <div className="table-container">
        <table className="table is-striped is-hoverable" height='800px' width='800px'>
          <thead>
            <tr>
              <th>name</th>
              <th>frequency</th>
              <th>city</th>
              <th>venue</th>
              <th>bringer night</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th></th>
              <th>
                <div className="dropdown" onClick={this.toggleIsActive}>
                  <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span id="frequency">filter frequency</span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      {frequencies.map((item) =>
                        <a className="dropdown-item" onClick={(e) => {
                          this.setButtonText(e, 'frequency'); this.props.handleChange(e);
                        }}>
                          {item}
                        </a>,
                      )}
                      <a className="dropdown-item" onClick={(e) => {
                        this.setButtonText(e, 'frequency'); this.props.handleChange(e);
                      }}>
                        any frequency
                      </a>
                    </div>
                  </div>
                </div>
              </th>
              <th></th>
              <th></th>
              <th>
                <div className="dropdown" onClick={this.toggleIsActive}>
                  <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span id="bringer">filter bringer night</span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <a className="dropdown-item" onClick={(e) => {
                        this.setButtonText(e, 'bringer'); this.props.handleChange(e);
                      }}>
                        only bringer night
                      </a>
                      <a className="dropdown-item" onClick={(e) => {
                        this.setButtonText(e, 'bringer'); this.props.handleChange(e);
                      }}>
                        not bringer night
                      </a>
                      <a className="dropdown-item" onClick={(e) => {
                        this.setButtonText(e, 'bringer'); this.props.handleChange(e);
                      }}>
                        don't care
                      </a>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.slice(0, 500).map((item) => (
              <tr key={item.Name}>
                <th>
                  <a href={item.FacebookPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <span> </span>
                  {item.Website != '' ?
                    <a href={item.Website}>
                      {item.Name}
                    </a> : item.Name
                  }
                </th>
                <td>{item.Frequency}</td>
                <td>{item.City}</td>
                <td>{item.Venue}</td>
                <td>{item.Bringer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      results: [],
    };
  }

  async componentDidMount() {
    const doc = new GoogleSpreadsheet('1uwHo4bGisUiQgwAnkFbVUZG2fabZD-uwaNx4JHlWnSs');
    doc.useApiKey("AIzaSyDWzk5MJLYVpzppXB9xxJWjVJnoe97erbc");
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    this.setState({
      results: rows,
      rows: rows,
    });
  };

  render() {
    return (
      <div className="section">
        <h1 className="title has-text-centered">
          Search Open Mic Nights in London
        </h1>
        <div className="field">
          <div className="control">
            <input
              type="text"
              id="search"
              className="input"
              onChange={() => this.handleChange()}
              placeholder="Try 'Angel Comedy'..."
            />
          </div>
        </div>
        <nav className="level">
          <div className="level-item">
            <Results
              results={this.state.results}
              handleChange={() => this.handleChange()}
            />
          </div>
          <div className="level-item">
            <Map
              places={this.state.results}
            />
          </div>
        </nav>
        <h5 className="title has-text-centered">
          Website created with ❤ by <a href="https://github.com/apuchitnis">@apuchitnis</a>. Thanks to GC for compiling all of the data.
        </h5>
        {/* <AppTable /> */}
      </div>
    );
  }

  handleChange() {
    let newResults = this.state.rows;

    const search = document.getElementById('search');
    if (search.value !== '') {
      newResults = newResults.filter((item) => {
        const name = item.Name.toLowerCase();
        const city = item.City.toLowerCase();
        const venue = item.Venue.toLowerCase();
        const filter = search.value.toLowerCase();
        return name.includes(filter) || city.includes(filter) || venue.includes(filter);
      });
    }

    const frequency = document.getElementById('frequency').textContent;
    newResults = newResults.filter((item) => {
      if ((item.Frequency == frequency) || (frequency === 'filter frequency') || (frequency === 'any frequency')) {
        return true;
      }
      return false;
    });

    const bringer = document.getElementById('bringer').textContent;
    newResults = newResults.filter((item) => {
      if ((item.bringer && bringer === 'only bringer night') || (!item.bringer && bringer === 'not bringer night') || (bringer === 'don\'t care') || (bringer === 'filter bringer night')) {
        return true;
      }
      return false;
    });

    this.setState({
      results: newResults,
    });
  }
}

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);
