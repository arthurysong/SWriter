import React from 'react';
import GoogleDrive from './GoogleDrive';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Authorized from './Authorized';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={GoogleDrive} />
        <Route path="/auth" component={Authorized} />
      </Router>
    </div>
  );
}

export default App;
