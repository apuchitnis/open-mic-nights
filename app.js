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
	console.log("results rendering with " + this.state.results.length)
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

	    sheet.getRows({ offset: 1, limit: 11 }, (err, response) => {
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
			results: results
		    },
		    () => console.log("updated s")
		);
		this.render()
	    });
	});
    }

    render() {
	console.log("app rendering with " + this.state.results.length)
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
