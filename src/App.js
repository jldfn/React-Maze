import './App.css';
import PathFinder from "./PathFinder";
import React from "react";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <PathFinder height={50} width={50}/>
      </header>
    </div>
  );
}

export default App;
