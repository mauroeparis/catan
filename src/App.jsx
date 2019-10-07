import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Lobby from "./components/Lobby"
import LobbyList from "./components/LobbyList"
import Game from "./components/Game"
import Board from "./board/Board";

function App() {
  const lobbyInfo = {
    id: 123,
    name: "Catan",
    owner: "Pedro",
    players: ["Pedro", "Juan", "Mario"],
    max_players: 4
  };

  const rooms = [
    {
      id: 1,
      name: "superMegaHyperMegaRed",
      owner: "Julian",
      players: ["Hoyito", "Mayco", "Julian"],
      max_players: 3
    },
    {
      id: 2,
      name: "Omega",
      owner: "Fabricio",
      players: ["Jose", "Pepe", "Fabricio", "Esteban"],
      max_players: 4
    }
  ];

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/lobby"
            exact
            render={props => <Lobby {...props} lobbyInfo={lobbyInfo} />}
          />
          <Route path="/game" component={Game}/>
          <Route
            path="/lobbyList"
            exact
            render={props => <LobbyList {...props} rooms={rooms} />}/>
          <Route path="/lobbyList" component={LobbyList}/>
          <Route path="/board" component={Board}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
