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
import BankTrade from "./components/BankTrade";

function App() {
  // TODO: add API call here
  const testresources = ["wool", "wool", "wool", "wool", "lumber"];
  return (
    <Router>
      <div className="h-screen">
        {!localStorage.token && <Redirect to="/login" />}
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/lobby" exact component={LobbyList} />
          <Route path="/lobby/:id" exact component={Lobby} />
          <Route path="/game/:id" exact component={Game} />
          <Route
            path="/game/:gameId/bankTrade"
            render={() => <BankTrade resources={testresources} />}
          />
          <Route path="/board" exact component={Board} />
          <Route path="/" render={() => <Redirect to="/lobby" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
