import React from 'react';
import './App.css';

import MainContainer from './components/MainContainer'
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <MainContainer />
      </Router>
    </div>
  );
}

export default App;
