import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import FiveBoroughs from './components/FiveBoroughs'
import Manhattan from './components/Manhattan'
import Nav from './components/Nav'
import About from './components/About'

import './css/App.css'

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

  constructor(props){
    super(props)
    this.state = {
      hover : "none"
    }
  }

  componentWillMount(){
    typography.injectStyles();
  }

  render() {
    return (
    <Router>
      <div>
        <Nav/>
        <Route exact path="/" component={Manhattan} />
        <Route path="/about" component={About}/>
        <Route path="/five-boroughs" component={FiveBoroughs}/>
      </div>
    </Router>);
  }
}

export default App;
