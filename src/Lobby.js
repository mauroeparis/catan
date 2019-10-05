import React from "react";
import exampleLobby from "./data/exampleLobby.json";
import {Link} from "react-router-dom";

function Lobby() {
  function enableToStart() {
    if (exampleLobby.max_players === 3) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <h1>Lobby</h1>
      {exampleLobby.map(lobby => {
        return <div>
          <h1 key={exampleLobby.id}>Name:{exampleLobby.name}</h1>
          <h1 key={exampleLobby.id}>Owner:{exampleLobby.owner}</h1>
          <h1 key={exampleLobby.id}>Players:{exampleLobby.players}</h1>
          <h1 key={exampleLobby.id}>Max Players:{exampleLobby.max_players}</h1>
        </div>
      })}
      <div>
        <Link to="/game">
          <button disabled={enableToStart()}>
            Start Game
          </button>
        </Link>
      </div>
      <div>
        <Link to="/lobbiesList">
          <button type="button">
            Leave Lobby
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Lobby;
