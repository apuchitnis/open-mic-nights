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
		<input
		    type="text"
		    className="input"
		    onChange={this.props.handleChange}
		    placeholder="Search..."
		/>
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

		var keys = Object.keys(response[0])
		console.log(response[0])
		console.log(keys)

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
			    handleChange={(e) => this.handleChange(e)}
			/>
		    </section>
		</div>
	    </div>
	);
    }

    handleChange(e) {
	let newResults = this.state.rows;

	if (e.target.value !== "") {
	    newResults = newResults.filter(item => {
		const comedyclubfestival = item.comedyclubfestival.toLowerCase();
		const city = item.city.toLowerCase();
		const venue = item.venue.toLowerCase();
		const filter = e.target.value.toLowerCase();
		return comedyclubfestival.includes(filter) || city.includes(filter) || venue.includes(filter);
	    });
	}

	this.setState({
	    results: newResults
	});
    }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
