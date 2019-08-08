import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './main/Home';
import Footer from './main/Footer';
import Header from './main/Header';
import Monster from './main/Monster';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/geners/:generId' component={Home} />
        <Route exact path='/mons/:monId' component={Monster} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
