import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import FiveBoroughs from './components/FiveBoroughs'
import Manhattan from './components/Manhattan'
import Nav from './components/Nav'
import Home from './components/Home'

import './App.css'

import typography from './utils/typography'

// temporary
const generateInfoBox = () => {
  return {
    population: Math.random(40000000),
    avg_income: Math.random(300000),
    pop_density: Math.random(2324),
  }
}

class App extends Component {

  componentWillMount(){
    typography.injectStyles();
  }

  render() {
    return (
    <Router>
      <div>
        <Nav/>
        <div className="container-fluid">
        <Route exact path="/" component={Home}/>
        <Route path="/five-boroughs" component={FiveBoroughs}/>
        <Route path="/manhattan" component={Manhattan}/>
        </div>
      </div>
    </Router>);
  }
}

export default App;
