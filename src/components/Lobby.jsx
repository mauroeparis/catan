import React from "react";
import { Link } from "react-router-dom";

import CatanTypes from "../CatanTypes";
import { ReactComponent as Crown } from "../public/icons/crown-solid.svg";
import { ReactComponent as Dot } from "../public/icons/circle-solid.svg";
import { ReactComponent as AlertIcon } from "../public/icons/exclamation-triangle-solid.svg";
import { ReactComponent as NormalUser } from "../public/icons/user-shield-solid.svg";

const TextClasses = "text-center text-sm tracking-wider text-bold";
const CommonClasses = "w-full shadow-md rounded h-12";

function Lobby({ name, owner, max_players, players }) {
  return (
    <div className="h-full bg-orange-300">
      <div className="py-5 flex flex-col">
        <h1 className="font-cinzel text-gray-900 text-5xl lg:text-6xl lg:text-bold md:pt-5 lg:pt-5 self-center">
          {name}
        </h1>
        <div className="w-11/12 md:w-8/12 self-center">
          <ul className="w-full rounded-lg mt-4 shadow-md">
            {players.map((player, index) => (
              <li
                key={player}
                className={`
                  py-4 px-6
                  w-full
                  text-gray-900 truncate
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index % 2 ? "bg-gray-200" : "bg-gray-300"}
                  ${index === players.length - 1 ? "rounded-b-lg" : ""}
                `}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row">
                    <div className={`w-6 h-6 mr-5 ${player === owner ? "text-blue-900" : "text-gray-600"}`}>
                      {player === owner ? <Crown /> : <NormalUser />}
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

          {players.length < max_players ? (
            <span className="text-red-700 flex flex-row m-3">
              <div className="w-6 h-6 mr-4">
                <AlertIcon />
              </div>
              ¡Necesitas {max_players - players.length} más en la partida!
            </span>
          ) : (
            ""
          )}

          <Link to="/" className="w-full text-center">
            <input
              type="button"
              value="START GAME"
              className={`
                h-12
                bg-blue-800
                text-white
                shadow
                ${
                  players.length < max_players
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                ${CommonClasses}
                ${TextClasses}
              `}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

Lobby.propTypes = CatanTypes.Room;

export default Lobby;
