import React from "react";
import ReactDOM from "react-dom";
import GoogleSpreadsheet from "google-spreadsheet";

class Results extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   results: this.props.results
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let currentList = this.props.results;
    let newList = [];

    if (e.target.value !== "") {
      newList = currentList.filter(item => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = currentList;
    }

    // this.setState({
    //   results: newList
    // });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="input"
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <ul>
          {this.props.results.map(item => (
            <li key={item}>{item} &nbsp;</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      results: ["Afghanistan", "Åland Islands", "Albania", "Algeria"]
    };
  }

  componentDidMount() {
    const doc = new GoogleSpreadsheet(
      "194rof1NCeXCIGIaPLQu61mj23-YeIFyJA4hQc8q7UQE",
      null,
      { gzip: false }
    );

    doc.getInfo((err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      const sheet = info.worksheets[0];

      sheet.getRows({ offset: 1, limit: 11 }, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(response);

        // do your actually data mapping here,
        const results = response.map(row => {
          return row.comedyclubfestival;
        });

        this.setState(
          {
            results: results
          },
          () => console.log("updated s")
        );
      });
    });
  }

  render() {
    console.log("in render");
    console.log(this.state.results);
    let hasResults = this.state.results.length > 0;
    if (hasResults) {
      return (
        <div className="content">
          <div className="container">
            <section className="section">
              <Results results={this.state.results} />
            </section>
          </div>
        </div>
      );
    }
  }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
