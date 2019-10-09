import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

// <ul>
//   <li>id: {room.id}</li>
//   <li>name: {room.name}</li>
//   <li>owner: {room.owner}</li>
//   <li>
//     <ul>
//       {room.players.map(player => (
//         <li>{player}</li>
//       ))}
//     </ul>
//   </li>
//   <li>max_players: {room.max_players}</li>
//   <li>
//     <Link to="/lobby">
//       <button type="button" onClick={() => alert("Will join you!")}>
//         JoinGame
//       </button>
//     </Link>
//   </li>
// </ul>

function LobbyList({ rooms }) {
  return (
    <div className="h-full bg-orange-300">
      <div className="py-5 flex flex-col">
        <h1 className="font-cinzel text-4xl lg:text-6xl lg:text-bold lg:pt-5 self-center">
          Lobby List
        </h1>
        <div className="table rounded mt-6 lg:mt-12 self-center w-11/12 lg:w-8/12">
          <div className="table-row bg-gray-100">
            <div className="table-cell py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Name
            </div>
            <div className="table-cell hidden md:block lg:block xl:block py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Players
            </div>
            <div className="table-cell py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Status
            </div>
          </div>
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`
                table-row
                ${index % 2 ? "bg-gray-200" : "bg-gray-300"}
              `}
            >
              <div className="table-cell py-4 px-6 text-gray-900 truncate">
                <Link to="/lobby">
                  <span>{room.name}</span>
                </Link>
              </div>
              <div className="table-cell hidden md:block lg:block xl:block py-4 px-6 text-gray-900 truncate">
                <Link to="/lobby">
                  <span>
                    {room.players.map((player, pIndex) => (
                      <span>
                        {player}
                        {`${pIndex !== room.players.length - 1 ? ", " : ""}`}
                      </span>
                    ))}
                  </span>
                </Link>
              </div>
              <div className="table-cell py-4 px-6 text-right text-gray-900">
                <Link to="Lobby">
                  <span>
                    {room.players.length}/{room.max_players}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

LobbyList.propTypes = {
  rooms: PropTypes.arrayOf(CatanTypes.Room).isRequired
};

export default LobbyList;
