import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { LoginPage } from "./components/Login";
import RegisterPage from "./components/Register";
import Lobby from "./components/Lobby";
import LobbyList from "./components/LobbyList";
import Game from "./components/Game";
import Board from "./components/Board";
import BankTrade from "./components/BankTrade";
import CreateLobby from "./components/CreateLobby";
import AuthContext, { authReducer } from "./AuthContext";

function App() {
  const [auth, authDispatch] = useReducer(authReducer, {
    token: localStorage.token,
    user: localStorage.user
  });

  return (
    <Router>
      <div className="h-screen">
        {!localStorage.token && <Redirect to="/login" />}
        <AuthContext.Provider value={{ auth, authDispatch }}>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/lobby" exact component={LobbyList} />
            <Route path="/lobby/create" exact component={CreateLobby} />
            <Route path="/lobby/:id" exact component={Lobby} />
            <Route path="/game/:id" exact component={Game} />
            <Route path="/game/:gameId/bankTrade" component={BankTrade} />
            <Route path="/board" exact component={Board} />
            <Route path="/" render={() => <Redirect to="/lobby" />} />
          </Switch>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
