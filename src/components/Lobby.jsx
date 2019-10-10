import React from "react";
import { Link } from "react-router-dom";
import CatanTypes from "../CatanTypes";

// TODO: For some reason I'm not being able to use this component,
// <Lobby
//   id={room.id}
//   name={room.name}
//   owner={room.owner}
//   max_players={room.max_players}
//   players={room.players}
// />
// It keeps saying in the browser console:
// Warning: Failed prop type: The prop `isRequired` is marked
// as required in `Lobby`, but its value is `undefined`.

function Lobby({ name, owner, max_players, players }) {
  return (
    <div>
      <h1>Name:{name}</h1>
      <h1>Owner:{owner}</h1>
      <h1>
        Players:
        {players.map(player => (
          <li key={player}>{player}</li>
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
