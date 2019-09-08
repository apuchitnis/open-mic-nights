import React from "react";
import ReactDOM from "react-dom";

import "./bulma.min.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results
    };
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
    this.setState({
      results: newList
    });
  }

  render() {
    return (
      <div>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
          <ul>
            {this.state.results.map(item => (
              <li key={item}>
                {item} &nbsp;
              </li>
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
      results: ["Afghanistan",
      "Åland Islands",
      "Albania",
      "Algeria"]
    };
  }

  render() {
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

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
