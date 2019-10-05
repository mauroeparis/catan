import React from 'react';
import './App.css';
import Lobby from "./Lobby"
import LobbiesList from "./LobbiesList"
import Game from "./Game"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Lobby}/>
          <Route path="/game" component={Game}/>
          <Route path="/lobbiesList" component={LobbiesList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
