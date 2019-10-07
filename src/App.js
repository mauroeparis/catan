import React from 'react';
import './App.css';
import Lobby from "./components/Lobby"
import LobbiesList from "./components/LobbiesList"
import Game from "./components/Game"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  const lobby_info = {
      "id" : 123,
      "name": "Catan",
      "owner" : "Pedro",
      "players" : ["Pedro", "Juan", "Mario"],
      "max_players" : 4
    };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={
            (props) => <Lobby {...props} lobby_info={lobby_info} />}/>
          <Route path="/game" component={Game}/>
          <Route path="/lobbiesList" component={LobbiesList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
