import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { SickestMinds } from './sickesMinds'
import ReactDOM from "react-dom"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SickestMinds />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

