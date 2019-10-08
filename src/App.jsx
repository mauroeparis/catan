import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/Login";
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
      <div className="h-screen">
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
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
