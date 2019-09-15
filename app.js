import React from "react";
import ReactDOM from "react-dom";
import GoogleSpreadsheet from "google-spreadsheet";

class Results extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	console.log("results rendering with " + this.props.results.length)
	return (
	    <div>
		<input
		    type="text"
		    className="input"
		    onChange={this.props.handleChange}
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

	    sheet.getRows({ offset: 1, limit: 1000 }, (err, response) => {
		if (err) {
		    console.log(err);
		    return;
		}

		const results = response.map(row => {
		    return row.comedyclubfestival;
		});
		console.log("results " + results)
		this.setState(
		    {
			results: results,
			rows: results
		    },
		    () => console.log("updated s")
		);
	    });
	});
    }

    render() {
	console.log("app rendering with " + this.state.results.length)
	return (
	    <div className="content">
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
		const lc = item.toLowerCase();
		const filter = e.target.value.toLowerCase();
		return lc.includes(filter);
	    });
	}

	this.setState({
	    results: newResults
	});
    }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
