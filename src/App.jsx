import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Lobby from "./components/Lobby";
import LobbyList from "./components/LobbyList";
import Game from "./components/Game";
import Board from "./board/Board";

function App() {
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
    },
    {
      id: 123,
      name: "Catan",
      owner: "Pedro",
      players: ["Pedro", "Juan", "Mario"],
      max_players: 4
    }
  ];
  const room = rooms[2];

  return (
    <Router>
      <ul>
        <li>
          <a href="/lobby">Lobby</a>
        </li>
        <li>
          <a href="/lobbyList">Lobby List</a>
        </li>
        <li>
          <a href="/board">Board</a>
        </li>
      </ul>
      <div className="App">
        <Switch>
          <Route
            path="/lobby"
            exact
            render={() => (
              <Lobby
                name={room.name}
                owner={room.owner}
                max_players={room.max_players}
                players={room.players}
              />
            )}
          />
          <Route path="/game" component={Game} />
          <Route
            path="/lobbyList"
            exact
            render={() => <LobbyList rooms={rooms} />}
          />
          <Route path="/board" component={Board} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
