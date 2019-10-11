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
import ResourcesList from "./components/ResourcesList";
import CardList from "./components/CardList";
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
  const resources = ["brick", "lumber", "wool", "grain", "ore", "ore", "brick"];
  const cards = ["road_building", "knight", "monopoly", "knight"];

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
          <Route path="/lobbyList" exact component={LobbyList} />
          <Route path="/board" component={Board} />
          <Route
            path="/resourcesList"
            exact
            render={() => <ResourcesList resources={resources} />}
          />
          <Route
            path="/cardList"
            exact
            render={() => <CardList cards={cards} />}
          />

          <Route path="/" component={Game} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
