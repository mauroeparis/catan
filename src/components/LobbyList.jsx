import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../Api";
import AuthContext from "../AuthContext";

function LobbyList() {
  const [rooms, setRooms] = useState([]);
  const { authDispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.lobbies.all();
      setRooms(res.data);
    };
    fetchRooms();
    const interval = setInterval(() => fetchRooms(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-orange-300 justify-center">
      <div className="py-5 flex flex-col">
        <h1 className="font-cinzel text-gray-900 text-4xl lg:text-6xl lg:text-bold lg:pt-5 self-center">
          Lobby List
        </h1>
        <div className="table rounded mt-6 lg:mt-12 self-center w-11/12 lg:w-8/12">
          <div className="table-row bg-gray-100">
            <div className="table-cell py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Name
            </div>
            <div className="table-cell hidden md:table-cell lg:table-cell xl:table-cell py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Players
            </div>
            <div className="table-cell py-4 px-6 font-bold uppercase text-center text-sm text-gray-700">
              Status
            </div>
          </div>
          {rooms.map((room, index) => (
            <Link
              to={`/lobby/${room.id}`}
              key={room.id}
              className={`
                table-row
                cursor-pointer
                hover:bg-gray-400
                ${index % 2 ? "bg-gray-200" : "bg-gray-300"}
              `}
            >
              <div className="table-cell py-4 px-6 text-gray-900 truncate">
                <span>{room.name}</span>
              </div>
              <div className="table-cell hidden md:block lg:block xl:block py-4 px-6 text-gray-900 truncate">
                <span>
                  {room.players.map((player, pIndex) => (
                    <span key={player}>
                      {player}
                      {`${pIndex !== room.players.length - 1 ? ", " : ""}`}
                    </span>
                  ))}
                </span>
              </div>
              <div className="table-cell py-4 px-6 text-right text-gray-900">
                {room.game_has_started ? (
                  <span>STARTED</span>
                ) : (
                  <span>
                    {room.players.length}/{room.max_players}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="table rounded mt-6 lg:mt-12 self-center w-11/12 lg:w-8/12 justify-center">
          <Link to="/lobby/create" className="w-full text-center self-center ">
            <input
              type="button"
              value="NEW LOBBY"
              className={`
              cursor-pointer
              h-12
              bg-blue-800
              text-white
              shadow
              w-full shadow-md rounded
              text-center text-sm self-center tracking-wider text-bold
            `}
            />
          </Link>
        </div>
      </div>
      <input
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          padding: "0 2rem",
          cursor: "pointer"
        }}
        type="submit"
        value="LOGOUT"
        className="mt-2 h-12 bg-blue-800 text-white text-center text-sm self-center tracking-wider text-bold shadow-md rounded h-12"
        onClick={() => {
          authDispatch({ type: "LOGOUT" });
          window.location.reload();
        }}
      />
    </div>
  );
}

export default LobbyList;
