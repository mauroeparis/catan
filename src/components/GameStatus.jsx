import React, { useContext } from "react";
import _ from "lodash";

import GameContext, {
  SET_DEFAULT,
  PLAY_KNIGHT,
  PLAY_ROAD_BUILDING
} from "../GameContext";
import api from "../Api";

export default function GameStatus() {
  const { phase, gameId, roads, gameDispatch, showModal } = useContext(
    GameContext
  );
  return (
    <div className="game-status">
      {/* TODO: Find a better way to inform the player the current phase */}
      <i style={{ position: "fixed", top: "1rem", right: "1rem" }}>
        {/* TODO: Find a better way to let the player cancel play_knight */}
        {[PLAY_KNIGHT, PLAY_ROAD_BUILDING].includes(phase) && (
          <button
            className="close"
            type="button"
            onClick={() => gameDispatch({ type: SET_DEFAULT })}
          >
            ☓
          </button>
        )}
        {[PLAY_KNIGHT, PLAY_ROAD_BUILDING].includes(phase) && (
          <button
            className="close"
            type="button"
            onClick={() => {
              if (roads.length === 2) {
                api.games.playAction(gameId, "play_road_building_card", roads);
                gameDispatch({ type: SET_DEFAULT });
              } else
                showModal({
                  disabled: false,
                  title: "Select two roads first",
                  buttons: [{ text: "Ok" }]
                });
            }}
          >
            ✓
          </button>
        )}
        {_.startCase(phase)}
      </i>
    </div>
  );
}
