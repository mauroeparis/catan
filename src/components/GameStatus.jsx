import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";

import GameContext, {
  SET_DEFAULT,
  PLAY_KNIGHT,
  PLAY_ROAD_BUILDING
} from "../GameContext";
import api from "../Api";
import { ReactComponent as Dot } from "../public/icons/circle-solid.svg";

export default function GameStatus() {
  const { phase, gameId, roads, gameDispatch, showModal } = useContext(
    GameContext
  );

  const [{ username, colour }, setTurn] = useState({
    username: null,
    colour: "yellow"
  });

  useEffect(() => {
    const fetchTurn = async () => {
      const res = await api.games.get(gameId);
      const usernameTurn = res.data.current_turn.user;
      const colourTurn = res.data.players.find(p => p.username === usernameTurn)
        .colour;

      setTurn({
        username: usernameTurn,
        colour: colourTurn
      });
    };
    fetchTurn();
    const interval = setInterval(() => fetchTurn(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  const playerColours = {
    red: "#F44336",
    blue: "#2196F3",
    yellow: "#FFC107",
    white: "#4CAF50"
  };

  const statusClasses =
    "bg-gray-400 p-3 text-gray-800 rounded-lg w-40 h-auto text-center";

  const cancelBtnClasses =
    "bg-red-800 w-full text-red-300 rounded-lg py-2 mt-3 uppercase hover:bg-red-900 hover:text-red-400";

  const successBtnClasses =
    "bg-green-800 w-full text-green-300 rounded-lg py-2 mt-2 uppercase hover:bg-green-900 hover:text-green-400";

  return (
    <div>
      {/* TODO: Find a better way to inform the player the current phase */}
      <div style={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <div className="pb-3 flex flex-row">
          <div
            className="self-center w-4 h-4 mr-5 inline-block"
            style={{ color: playerColours[colour] }}
          >
            <Dot />
          </div>
          <span>
            {username ? `${_.capitalize(username)}'s Turn` : "Loading Turn..."}
          </span>
        </div>
        <div className={statusClasses}>
          {_.startCase(phase)}
          {/* TODO: Find a better way to let the player cancel play_knight */}
          {[PLAY_KNIGHT, PLAY_ROAD_BUILDING].includes(phase) && (
            <button
              className={cancelBtnClasses}
              type="button"
              onClick={() => gameDispatch({ type: SET_DEFAULT })}
            >
              cancel
            </button>
          )}
          {[PLAY_ROAD_BUILDING].includes(phase) && (
            <button
              className={successBtnClasses}
              type="button"
              onClick={() => {
                if (roads.length === 2) {
                  api.games.playAction(
                    gameId,
                    "play_road_building_card",
                    roads
                  );
                  gameDispatch({ type: SET_DEFAULT });
                } else
                  showModal({
                    disabled: false,
                    title: "Select two roads first",
                    buttons: [{ text: "Ok" }]
                  });
              }}
            >
              done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
