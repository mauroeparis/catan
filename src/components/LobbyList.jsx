import React from "react";
import { Link } from "react-router-dom";

function LobbyList({ rooms }) {
  function sayAlert() {
    alert("hola");
  }
  return (
    <li>
      {rooms.map((room, index) => (
        <li>
          <ul>id: {room.id}</ul>
          <ul>name: {room.name}</ul>
          <ul>owner: {room.owner}</ul>
          <ul>
            <li>
              {room.players.map((player, index) =>
                <ul>{player}</ul>)}
            </li>
          </ul>
          <ul>max_players: {room.max_players}</ul>
          <ul>
            <Link to="/lobby">
              <button onClick={sayAlert}>Join Game</button>
            </Link>
          </ul>
        </li>
      ))}
    </li>
  );
}
export default LobbyList;
