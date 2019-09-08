import React from "react";
import ReactDOM from "react-dom";
import GoogleSpreadsheet from "google-spreadsheet";

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
	    isFetching: true,
	    results: ["Afghanistan",
		      "Åland Islands",
		      "Albania",
		      "Algeria"]
	};
    }

    componentDidMount() {
	console.log("in component did mount")

	let doc = new GoogleSpreadsheet('194rof1NCeXCIGIaPLQu61mj23-YeIFyJA4hQc8q7UQE', null, {gzip: false});
	let sheet;
	let names;
	let rows = [];
	doc.getInfo(function(err, info) {
	    if( err ) {
		console.log(err);
	    }
	    console.log('Loaded doc: '+info.title+' by '+info.author.email);
	    sheet = info.worksheets[0];
	    console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+' x '+sheet.colCount);
	    sheet.getRows({offset: 1, limit: 11}, function(err, rs) {
		if( err ) {
		    console.log(err);
		}
		rows=rs;
		console.log("example row: " + rows[10].comedyclubfestival);
		console.log("getRows rows: " + rows);
	    });
	    console.log("getInfo rows: " + rows);
    });
    console.log("outside rows: " + rows) // this is empty, can I set this.state.results to the actual rows that was returned?
}
    
    render() {
	console.log("in render")
	console.log(this.state.results)
	let hasResults = this.state.results.length > 0
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
	};
    }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
