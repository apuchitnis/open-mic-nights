import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import './scrollable.css';
import { useFilters, useTable } from 'react-table'

const { GoogleSpreadsheet } = require('google-spreadsheet');

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


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
        return data.rows.map((item) => {
          return {
            RowNumber: item.rowNumber,
            Bringer: item.Bringer,
            FacebookPage: item.FacebookPage,
            Frequency: item.Frequency,
            Name: item.Name,
            Venue: item.Venue,
            Latitude: item.Latitude,
            Longitude: item.Longitude,
          }
        })
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
        // return data.headerValues.map((item) => { return { Header: item, accessor: item }; })
        return [
          {
            Header: 'Bringer',
            accessor: 'Bringer',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Facebook Page',
            accessor: 'FacebookPage',
          },
          {
            Header: 'Frequency',
            accessor: 'Frequency',
          },
          {
            Header: 'Name',
            accessor: 'Name',
          },
          {
            Header: 'Venue',
            accessor: 'Venue',
          },
          {
            Header: 'Latitude',
            accessor: 'Latitude',
          },
          {
            Header: 'Longitude',
            accessor: 'Longitude',
          },
          {
            Header: 'RowNumber',
            acccessor: 'RowNumber',
          }
        ]
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

  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter,
    }),
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data: rowsData, defaultColumn, filterTypes }, useFilters)

  return (
    <div>
      <div>
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
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
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
      </div>
      <div>
        <div className="level-item">
          <Map
            results={rows}
          />
        </div>
      </div>
    </div>
  )
}

const InfoWindow = (props) => {
  const { name } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 50,
    left: '-45px',
    textAlign: 'center',
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
    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 20,
      width: 20,
      backgroundColor: this.props.show ? 'red' : 'blue',
      cursor: 'pointer',
      zIndex: 10,
    };
    return (
      <div style={markerStyle}>
        {this.props.show && <InfoWindow name={this.props.name} />}
      </div>
    );
  }
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    }
  }

  _onChildClick = (key, childProps) => {
    this.setState((state) => {
      let index = state.results.findIndex(e => e.show);
      if (index > 0 && state.results[index].original.RowNumber != parseInt(key)) {
        state.results[index].show = false;
      }
      index = state.results.findIndex(e => e.original.RowNumber == parseInt(key));
      state.results[index].show = !state.results[index].show; // eslint-disable-line no-param-reassign
      return { results: state.results };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.results != prevProps.results) {
      this.setState(() => {
        const newState = this.props.results.map(result => ({ ...result, show: false }));
        return { results: newState };
      })
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '95vh', width: '95vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB2xTrXYV7Y6bN1BVVPrt2ZUglBPTZ-2S4' }}
          defaultCenter={{ lat: 51.5074, lng: -0.05 }}
          defaultZoom={14}
          onChildClick={this._onChildClick}
        >
          {this.state.results.map((item) =>
            <MapMarker
              key={item.original.RowNumber}
              lat={item.original.Latitude}
              lng={item.original.Longitude}
              name={item.original.Name}
              show={item.show}
            />,
          )}
        </GoogleMapReact>
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
                        <a className="dropdown-item" key={item} onClick={(e) => {
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
        </nav>
        <h5 className="title has-text-centered">
          Website created with ❤ by <a href="https://github.com/apuchitnis">@apuchitnis</a>. Thanks to GC for compiling all of the data.
        </h5>
        <div>
          <AppTable />
        </div>
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
