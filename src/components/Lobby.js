import React from "react";
import {Link} from "react-router-dom";

function Lobby({lobby_info}) {
  function enableToStart() {
    if (lobby_info.max_players === 3) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <h1>Name:{lobby_info.name}</h1>
      <h1>Owner:{lobby_info.owner}</h1>
      <h1>Players:{lobby_info.players.map((player, index) => <li>{player}</li>)}</h1>
      <h1>Max Players:{lobby_info.max_players}</h1>
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
