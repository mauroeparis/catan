import React, { useContext } from "react";
import PropTypes from "prop-types";

import getVertex from "../Vertex";
import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext, { DEFAULT } from "../GameContext";

// TODO: Unit param should probably come from an upper global config state
export default function Settlement({
  position,
  unit = 256,
  isCity,
  colour,
  username,
  canUpgrade
}) {
  const { phase, gameId, showModal } = useContext(GameContext);
  const isValidPhase = [DEFAULT].includes(phase);
  const enabled = canUpgrade && isValidPhase;
  const tryUpgrade = () => {
    if (enabled) {
      const disabled = false;
      const title = "Upgrade City";
      const body =
        "It will cost you 3 ore and 2 grain. Are you sure you want to upgrade it?";
      const buttons = [
        {
          text: "Accept",
          primary: true,
          callback: () => api.games.playAction(gameId, "upgrade_city", position)
        },
        {
          text: "Cancel"
        }
      ];
      showModal({ disabled, title, body, buttons });
    }
  };
  const center = getVertex(position.level, position.index, unit);
  return (
    <g className="settlement" onClick={tryUpgrade}>
      <circle
        cx={center.x}
        cy={center.y}
        r={isCity ? "48px" : "32px"}
        fill={colour}
        stroke={enabled ? "#E91E63" : "white"}
        strokeWidth="10"
      />
      <text
        x={center.x}
        y={center.y + 3} // HACK: +3 seems to center the sans-serif font
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {position.index}
      </text>
    </g>
  );
}

Settlement.propTypes = {
  position: CatanTypes.VertexPosition.isRequired,
  unit: PropTypes.number,
  isCity: PropTypes.bool.isRequired,
  colour: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  canUpgrade: PropTypes.bool.isRequired
};

Settlement.defaultProps = {
  unit: 256
};

export function BuildIndicator({ position, unit = 256 }) {
  const { phase, gameId, showModal } = useContext(GameContext);
  const validPhase = [DEFAULT].includes(phase);
  const enabled = validPhase;
  const doBuild = () => {
    const disabled = false;
    const title = "Build Settlement";
    const body =
      "It will cost you 1 brick, 1 lumber, 1 wool and 1 grain. Are you sure you want to build it?";
    const buttons = [
      {
        text: "Accept",
        primary: true,
        callback: () =>
          api.games.playAction(gameId, "build_settlement", position)
      },
      {
        text: "Cancel"
      }
    ];
    showModal({ disabled, title, body, buttons });
  };

  const center = getVertex(position.level, position.index, unit);
  const radius = enabled ? "48px" : "0px";
  return (
    <circle
      className="build-indicator"
      onClick={doBuild}
      cx={center.x}
      cy={center.y}
      r={radius}
      fill="transparent"
      stroke="#E91E63"
      strokeWidth="10"
    />
  );
}

BuildIndicator.propTypes = {
  position: CatanTypes.VertexPosition.isRequired,
  unit: PropTypes.number
};

BuildIndicator.defaultProps = {
  unit: 256
};
