import React from "react";
import ReactDOM from "react-dom";
import GoogleSpreadsheet from "google-spreadsheet";

class Results extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return (
	    <div>
		<div class="field">
		    <div class="control">
			<input
			type="text"
			id="search"
			className="input"
			onChange={this.props.handleChange}
			placeholder="Search..."		
			/>
		    </div>
		</div>

		<div class="field">
		    <label className="checkbox is-pulled-right">
			<div class="control">
			    <input
				type="checkbox"
				id="bringer"
				onChange={this.props.handleChange}
			    />
			    bringer night
			</div>
		    </label>
		</div>

		    <table className="table">
			<thead>
			    <tr>
				<th>name</th>
				<th>city</th>
				<th>venue</th>
				<th>bringer</th>
			    </tr>
			</thead>
			<tbody>
			    {this.props.results.map(item => (
				<tr key={item.comedyclubfestival}>
				    <th>{item.comedyclubfestival}</th>
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
		    Created with ❤ by <a href="https://github.com/apuchitnis">@apuchitnis</a>.
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

	var bringer = document.getElementById('bringer')
	newResults = newResults.filter(item => {
	    if ((item.bringer && bringer.checked) || (!item.bringer && !bringer.checked)) {
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
