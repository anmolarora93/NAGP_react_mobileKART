import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Router } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import Home from './Home';
import User from './User';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/home" component = {Home}/>
            <Route path="/user" component ={User}/>
            <Route path="/cart" component = {Cart}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
