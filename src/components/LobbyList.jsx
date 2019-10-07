import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function LobbyList({ rooms }) {
  return (
    <ul>
      {rooms.map(room => (
        <ul>
          <li>id: {room.id}</li>
          <li>name: {room.name}</li>
          <li>owner: {room.owner}</li>
          <li>
            <ul>
              {room.players.map(player => (
                <li>{player}</li>
              ))}
            </ul>
          </li>
          <li>max_players: {room.max_players}</li>
          <li>
            <Link to="/lobby">
              <button type="button" onClick={() => alert("Will join you!")}>
                JoinGame
              </button>
            </Link>
          </li>
        </ul>
      ))}
    </ul>
  );
}

LobbyList.propTypes = {
  rooms: PropTypes.arrayOf(CatanTypes.Room).isRequired
};

export default LobbyList;
