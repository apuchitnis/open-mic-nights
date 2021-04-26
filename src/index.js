import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import './styles.css';
import { useFilters, useTable } from 'react-table'
import logo from './apple-touch-icon.png';

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
    <select className="select is-small"
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

function SearchColumnFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <input className="input is-small" value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
  )
}

function TableAndMap() {
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
        console.error(e);
        setData({ ...data, isFetching: false });
      }
    }());
  }, []);

  const rowsData = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        return data.rows.map((row) => {
          return {
            RowNumber: row.rowNumber,
            Bringer: row.Bringer,
            FacebookPage: row["Facebook Page"],
            FacebookGroup: row["Facebook Group"],
            Frequency: row.Frequency,
            Name: row.Name,
            Venue: row.Venue,
            Latitude: row.Latitude,
            Longitude: row.Longitude,
            Weekday: row["Weekday / Month"],
            Address: row.Address,
            Indoor: row["Indoor / Outdoor"],
            BackOn: row["Back on"],
            Category: row["Event Category"],
            Level: row["Comedian Level"],
            Description: row["Event Description"],
            Website: row.Website,
          }
        })
      }
      return []
    },
    [data]
  )

  const columns = React.useMemo(
    () => {
      if (!data.isFetching && data.headerValues != null) {
        return [
          {
            Header: 'Name',
            accessor: 'Name',
            Filter: SearchColumnFilter,
          },
          {
            Header: 'Bringer',
            accessor: 'Bringer',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Weekday',
            accessor: 'Weekday',
            Filter: SearchColumnFilter,
          },
          {
            Header: 'Venue',
            accessor: 'Venue',
            Filter: SearchColumnFilter,
          },
          {
            Header: 'Address',
            accessor: 'Address',
            disableFilters: true,
            hideInitially: true,
          },
          {
            Header: 'Facebook Page',
            accessor: 'FacebookPage',
            disableFilters: true,
          },
          {
            Header: 'BackOn',
            accessor: 'BackOn',
            Filter: SelectColumnFilter,
            hideInitially: true,
          },
          {
            Header: 'Frequency',
            accessor: 'Frequency',
            Filter: SearchColumnFilter,
          },
          {
            Header: 'Indoor?',
            accessor: 'Indoor',
            hideInitially: true,
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Category',
            accessor: 'Category',
            hideInitially: true,
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Level',
            accessor: 'Level',
            hideInitially: true,
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Website',
            accessor: 'Website',
            hideInitially: true,
            disableFilters: true,
          },
          {
            Header: 'Description',
            accessor: 'Description',
            hideInitially: true,
            Filter: SearchColumnFilter,
          },
          {
            Header: 'Facebook Group',
            accessor: 'FacebookGroup',
            hideInitially: true,
            disableFilters: true,
          },
        ]
      }
      return []
    },
    [data]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns
  } = useTable({ columns, data: rowsData, initialState: { hiddenColumns: columns.filter(c => c.hideInitially).map(c => c.Header) } }, useFilters)


  // line is zero-based
  // line is the row number that you want to see into view after scroll  

  return (
    <>
      <div className="columns is-multiline">
        <span className="map column is-12-mobile is-5-desktop">
          <Map
            results={rows}
          />
        </span>
        <span className="table_wrapper column is-12-mobile is-7-desktop">

          <div id="table-dropdown" className="dropdown">
            <div className="dropdown-trigger">
              <button className="button" onClick={() => document.getElementById("table-dropdown").classList.toggle("is-active")}>
                Select columns 🔽
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              {allColumns.map(column => (
                <div key={column.id} className="dropdown-content">
                  <label className="checkbox">
                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                    {column.id}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <table className="table is-hoverable" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
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
        </span>
      </div>
    </>
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
    borderRadius: '25px',
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
      zIndex: 10,
      cursor: 'pointer',
    };
    return (
      <div className={this.props.show ? "has-background-warning" : "has-background-primary-dark"} style={markerStyle}>
        {this.props.show && <InfoWindow name={this.props.name} />}
      </div>
    );
  }
}

class Map extends React.Component {
  // TODO: turn this into a function 
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

      const cells = document.querySelectorAll('td')
      var found = null;
      for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent == state.results[index].original.Name) {
          found = cells[i];
          break;
        }
      }
      found.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      return { results: state.results };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.results != prevProps.results) {
      this.setState((_, props) => {
        const newState = props.results.map(result => ({ ...result, show: false }));
        return { results: newState };
      })
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="map">
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

function App() {
  const qna = [
    {
      "question": "My night's details are out of date! ⌚",
      "answer": "Just let us know! We'll make a asap: email@example.com",
    },
    {
      "question": "I have feedback to share / found a bug! 🐛",
      "answer": "Good hunting 😄 Send us feedback here: ...",
    }
  ]
  return (
    <>
      <nav className="navbar is-light has-shadow py-4 mb-2">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src={logo} style={{ maxHeight: "60px" }} />
          </a>
          <div className="navbar-item">
            <p className="title">
              🎙Perform comedy near you
            </p>
          </div>
          <div className="navbar-burger" onClick={() => document.getElementById("nav-links").classList.toggle("is-active")}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="navbar-menu" id="nav-links">
          <div className="navbar-end">
            <a className="navbar-item">Facebook</a>
            <a className="navbar-item">Sheet</a>
            <a className="navbar-item">🙏 Submit feedback 🙏</a>
          </div>
        </div>
      </nav>

      <TableAndMap />

      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">

            {qna.map((qa) => {
              return <div className="column" key={qa.question}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title">
                      {qa.question}
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      {qa.answer}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
          <p className="has-text-centered my-2 mx-2">
            Website created with ❤ by <a href="https://apuchitnis.github.io/">@apuchitnis</a>. Thanks to GC for compiling all of the data.
          </p>
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);