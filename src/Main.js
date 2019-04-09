import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import HowToPlay from "./HowToPlay"; 
import Lobby from "./Lobby"; 
import LogIn from "./LogIn"; 

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
      
        <div>
          {/* <h1>Simple SPA</h1> */}
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/howToPlay">How To Play</NavLink></li>
            <li><NavLink to="/lobby">Play</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/howToPlay" component={HowToPlay} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/login" component={LogIn} />

          </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default Main;
