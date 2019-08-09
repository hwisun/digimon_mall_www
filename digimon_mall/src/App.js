import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './main/Home';
import Footer from './main/Footer';
import Header from './main/Header';
import Monster from './main/Monster';
import Login from './main/Login';
import MyMons from './main/MyMons';
import CartMons from './main/CartMons';
import ObserverTest from './observer/ObserverTest';

 function App() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/geners/:generId' component={Home} />
          <Route exact path='/mons/:monId' component={Monster} />
          <Route exact path='/me/mons' component={MyMons} />
          <Route exact path='/cart/mons' component={CartMons} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/observer-test' component={ObserverTest} />
        </Switch>
        <Footer />
      </Router>
    );
}

export default App;