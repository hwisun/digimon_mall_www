import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './main/Home';
import Footer from './main/Footer';
import Header from './main/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/geners/:generId' component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
