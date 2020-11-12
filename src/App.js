import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from './routes/Routes';
import monitor from './assets/images/monitor.jpg';

function App() {
  return (
    <div className="app">
      <div className="mediaSizeOkay">
        <Router><Routes /></Router>
      </div>

      <div className="mediaSizeNotOkay">
        <h3>
          MWriter says...
        </h3>
        <img src={monitor} alt="desktop monitor icon" height="120px"/>
        <p className="mediaSizeNotOkay__p"> 
          Please use this app on a desktop device. 
        </p>
        <p className="mediaSizeNotOkay__small">
          We still need to size everything for mobile and tablet versions. 
        </p>
        <h1>
          Thanks!
        </h1>
      </div>
    </div>
  );
}

export default App;
