import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from './routes/Routes';

function App() {
  return (
    <div className="app">
      <Router><Routes /></Router>
    </div>
  );
}

export default App;
