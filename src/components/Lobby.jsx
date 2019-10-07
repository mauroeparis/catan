import React from "react";
import { Link } from "react-router-dom";

function Lobby({ lobbyInfo }) {
  function enableToStart() {
    if (lobbyInfo.max_players === 3) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <h1>Name:{lobbyInfo.name}</h1>
      <h1>Owner:{lobbyInfo.owner}</h1>
      <h1>
        Players:
        {lobbyInfo.players.map((player, index) =>
        <li>{player}</li>
        )}</h1>
      <h1>Max Players:{lobbyInfo.max_players}</h1>
      <div>
        <Link to="/game">
          <button type="button" disabled={enableToStart()}>Start Game</button>
        </Link>
      </div>
      <div>
        <Link to="/lobbyList">
          <button type="button">Leave Lobby</button>
        </Link>
      </div>
    </div>
  );
}

export default Lobby;
