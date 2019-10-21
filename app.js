import React from "react";
import ReactDOM from "react-dom";
import GoogleSpreadsheet from "google-spreadsheet";

class Results extends React.Component {
    constructor(props) {
	super(props);
    }

    toggleIsActive(e) {
	e.currentTarget.classList.toggle('is-active');
    }

    setButtonText(e, id) {
	document.getElementById(id).textContent=e.target.textContent;
    }

    render() {
	var tj = require('togeojson')

	fetch("https://cors-anywhere.herokuapp.com/" + "http://www.google.com/maps/d/kml?forcekml=1&mid=1h6A4nKuBB3Cajvvy0vMWvnuX8mBvLhJw")
	    .then(response => response.text())
	    .then(function(contents){ 
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(contents, "text/xml");
		var json = tj.kml(xmlDoc)
		return contents
	    })
	    .catch(fail => console.log(fail))

	let frequencies = Array.from(new Set(this.props.results.map(item => item.frequency)));

	return (
	    <div>
		<div className="field">
		    <div className="control">
			<input
			type="text"
			id="search"
			className="input"
			onChange={this.props.handleChange}
			placeholder="Try 'Angel Comedy'..."
			/>
		    </div>
		</div>
		<table className="table is-striped is-hoverable">
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
					    {frequencies.map(item =>
						<a className="dropdown-item" onClick={(e) => {this.setButtonText(e, "frequency"); this.props.handleChange(e);}}>
						    {item}
						</a>
					    )}
					    <a className="dropdown-item" onClick={(e) => {this.setButtonText(e, "frequency"); this.props.handleChange(e);}}>
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
					    <a className="dropdown-item" onClick={(e) => {this.setButtonText(e, "bringer"); this.props.handleChange(e);}}>
						only bringer night
					    </a>
					    <a className="dropdown-item" onClick={(e) => {this.setButtonText(e, "bringer"); this.props.handleChange(e);}}>
						not bringer night
					    </a>
					    <a className="dropdown-item" onClick={(e) => {this.setButtonText(e, "bringer"); this.props.handleChange(e);}}>
						don't care
					    </a>
					</div>
				    </div>
				</div>
			    </th>
			</tr>
		    </thead>
		    <tbody>
			{this.props.results.map(item => (
			    <tr key={item.comedyclubfestival}>
				<th>
				    <a href={item.facebook}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
					</svg>
				    </a>
				    <span> </span>
				    {item.website != ""?
				     <a href={item.website}>
					 {item.comedyclubfestival}
				     </a> : item.comedyclubfestival
				    }
				</th>
				<td>{item.frequency}</td>
				<td>{item.city}</td>
				<td>{item.venue}</td>
				<td>{item.bringer}</td>
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
	    results: []
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

	    sheet.getRows({ offset: 1, limit: 10 }, (err, response) => {
		if (err) {
		    console.log(err);
		    return;
		}

		this.setState(
		    {
			results: response,
			rows: response
		    },
		    () => console.log("updated")
		);
	    });
	});
    }

    render() {
	return (
	    <div className="content">
		<h1 className="title has-text-centered">
		    Search Open Mic Nights in London
		</h1>
		<div className="container">
		    <section className="section">
			<Results 
			    results={this.state.results}
			    handleChange={() => this.handleChange()}
			/>
		    </section>
		</div>
		<h5 className="title has-text-centered">
		    Website created with ❤ by <a href="https://github.com/apuchitnis">@apuchitnis</a>. Thanks to GC for compiling the original spreadsheet.
		</h5>
	    </div>
	);
    }

    handleChange() {
	let newResults = this.state.rows;

	var search = document.getElementById('search')
	if (search.value !== "") {
	    newResults = newResults.filter(item => {
		const comedyclubfestival = item.comedyclubfestival.toLowerCase();
		const city = item.city.toLowerCase();
		const venue = item.venue.toLowerCase();
		const filter = search.value.toLowerCase();
		return comedyclubfestival.includes(filter) || city.includes(filter) || venue.includes(filter);
	    });
	}

	var frequency = document.getElementById('frequency').textContent
	newResults = newResults.filter(item => {
	    if ((item.frequency == frequency) || (frequency==="filter frequency") || (frequency==="any frequency")) {
	       return true;
	   }
	    return false
	});
	
	var bringer = document.getElementById('bringer').textContent
	newResults = newResults.filter(item => {
	    if ((item.bringer && bringer==="only bringer night") || (!item.bringer && bringer==="not bringer night") || (bringer==="don't care") || (bringer==="filter bringer night")) {
		return true;
	    }
	    return false;
	});
	

	this.setState({
	    results: newResults
	});
    }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
