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
import Board from "./board/Board";

function App() {
  return (
    <Router>
      <div className="h-screen">
        {!localStorage.token && <Redirect to="/login" />}
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/lobby" exact component={LobbyList} />
          <Route path="/lobby/:id" exact component={Lobby} />
          <Route path="/game/:id" exact component={Game} />
          <Route path="/board" exact component={Board} />
          <Route path="/" render={() => <Redirect to="/lobby" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
