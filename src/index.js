import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./assets/styles.css";

import TableAndMap from "./TableAndMap";
import NavigationBar from "./NavigationBar";

const GitHubURL = "https://github.com/morettimarco/open-mic-nights";

const SpreadsheetId = "1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8";
const SpreadsheetURL =
  "https://docs.google.com/spreadsheets/d/" + SpreadsheetId;

// This is a custom filter UI for selecting
// a unique option from a list

function App() {
  const qna = [
    {
      question: "Found a bug? Wanna contribute? Rip the site and f**k us?",
      answer: (
        <p>
          Here's our <a href={GitHubURL}>Git repo</a>! Take a look at my code!
        </p>
      ),
    },
    {
      question: "How can I view the raw data of app?",
      answer: (
        <p>
          Head to the <a href={SpreadsheetURL}>Google Sheet.</a>
        </p>
      ),
    },
    {
      question: "Credits",
      answer: (
        <p>
          Many thanks to the original project{" "}
          <a href="https://apuchitnis.github.io/open-mic-nights/">
            London Standup Comedy Map
          </a>{" "}
          and to the awsome{" "}
          <a href="https://apuchitnis.github.io/"> Apu Chitnis</a> for sharing
          it.
        </p>
      ),
    },
  ];
  return (
    <>
      <NavigationBar />

      <TableAndMap />

      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">
            {qna.map((qa) => {
              return (
                <div className="column" key={qa.question}>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-title">{qa.question}</div>
                    </div>
                    <div className="card-content">
                      <div className="content">{qa.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
