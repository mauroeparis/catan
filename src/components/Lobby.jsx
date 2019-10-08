import React from "react";
import { Link } from "react-router-dom";
import CatanTypes from "../CatanTypes";

function Lobby({ name, owner, max_players, players }) {
  return (
    <div>
      <h1>Name:{name}</h1>
      <h1>Owner:{owner}</h1>
      <h1>
        Players:
        {players.map(player => (
          <li>{player}</li>
        ))}
      </h1>
      <h1>Max Players:{max_players}</h1>
      <div>
        <Link to="/game">
          <button
            type="button"
            disabled={players.length >= 3 && players.length <= max_players}
          >
            Start Game
          </button>
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

Lobby.propTypes = CatanTypes.Room;

export default Lobby;
