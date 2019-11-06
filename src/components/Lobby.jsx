import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ReactComponent as Crown } from "../public/icons/crown-solid.svg";
import { ReactComponent as Dot } from "../public/icons/circle-solid.svg";
import { ReactComponent as AlertIcon } from "../public/icons/exclamation-triangle-solid.svg";
import { ReactComponent as NormalUser } from "../public/icons/user-shield-solid.svg";

import api from "../Api";

const TextClasses = "text-center text-sm tracking-wider text-bold";
const CommonClasses = "w-full shadow-md rounded h-12";

function Lobby() {
  // TODO: This is the room id, not the game id, but it is used as such below
  const { id } = useParams();

  const [room, setRoom] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await api.lobbies.get(id);
      setRoom(res.data);
    };
    fetchRoom();
    const interval = setInterval(() => fetchRoom(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [id]);

  const handleJoin = async event => {
    event.preventDefault();
    try {
      const res = await api.lobbies.join(id);
      console.log(res); // TODO: Handle join response
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  if (!room) return <div> Loading! </div>;
  return (
    <div className="h-full bg-orange-300">
      <div className="py-5 flex flex-col">
        <h1 className="font-cinzel text-gray-900 text-5xl lg:text-6xl lg:text-bold md:pt-5 lg:pt-5 self-center">
          {room.name}
        </h1>
        <div className="w-11/12 md:w-8/12 self-center">
          <ul className="w-full rounded-lg mt-4 shadow-md">
            {room.players.map((player, index) => (
              <li
                key={player}
                className={`
                  py-4 px-6
                  w-full
                  text-gray-900 truncate
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index % 2 ? "bg-gray-200" : "bg-gray-300"}
                  ${index === room.players.length - 1 ? "rounded-b-lg" : ""}
                `}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row">
                    <div
                      className={`w-6 h-6 mr-5 ${
                        player === room.owner
                          ? "text-blue-900"
                          : "text-gray-600"
                      }`}
                    >
                      {player === room.owner ? <Crown /> : <NormalUser />}
                    </div>
                    <span>{player}</span>
                  </div>
                  <div className="self-center w-3 h-3 mr-5 text-green-600">
                    <Dot />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {room.players.length < 3 ? (
            <span className="text-red-700 flex flex-row m-3">
              <div className="w-6 h-6 mr-4">
                <AlertIcon />
              </div>
              ¡Necesitas {3 - room.players.length} más en la partida!
            </span>
          ) : (
            <div className="m-4" />
          )}
          <input
            type="button"
            value="JOIN GAME"
            disabled={!(room.players.length < room.max_players)}
            onClick={handleJoin}
            className={`
              h-12
              bg-orange-600
              text-white
              shadow
              ${CommonClasses}
              ${TextClasses}
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:opacity-50
            `}
          />
          <div className="m-4" />
          <Link to={`/game/${id}`} className="w-full text-center">
            <input
              type="button"
              value="START GAME"
              disabled={
                !(
                  room.players.length >= 3 &&
                  room.players.length <= room.max_players
                )
              }
              className={`
                h-12
                bg-blue-800
                text-white
                shadow
                ${CommonClasses}
                ${TextClasses}
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-50
              `}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
