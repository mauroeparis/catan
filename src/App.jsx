import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from "./components/Login";
import Lobby from "./components/Lobby";
import LobbyList from "./components/LobbyList";
import Game from "./components/Game";
import Board from "./components/Board";
import BankTradeComp from "./components/BankTradeComp";

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

  const testresources = ["wool", "wool", "wool", "wool", "lumber"];
  return (
    <Router>
      <div className="h-screen">
        {!localStorage.token && <Redirect to="/login" />}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route
            path="/lobby"
            exact
            render={() => (
              <Lobby
                id={room.id}
                name={room.name}
                owner={room.owner}
                max_players={room.max_players}
                players={room.players}
              />
            )}
          />
          <Route
            path="/lobbyList"
            exact
            render={() => <LobbyList rooms={rooms} />}
          />

          <Route path="/board" component={Board} />
          <Route
            path="/games/:gameId/bankTrade"
            render={() => <BankTradeComp resources={testresources} />}
          />
          <Route path="/games/:gameId" component={Game} />
          <Route path="/" render={() => <Redirect to="/lobbyList" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
