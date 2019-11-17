import React, { useContext } from "react";
import PropTypes from "prop-types";

import V from "../Vector";
import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext, { PLAY_KNIGHT } from "../GameContext";

function Hexagon({
  position,
  terrain,
  token,
  unit = 256,
  hasRobber,
  availableRobberMove,
  adjacentPlayersToRob
}) {
  const { phase, gameId, showModal } = useContext(GameContext);
  const validPhase = [PLAY_KNIGHT].includes(phase);
  const enabled = availableRobberMove && validPhase;
  // Point positioning
  const width = Math.sqrt(3) * unit;
  const radius = unit;
  const height = 2 * radius;
  const wunit = width / 2;
  const hunit = height / 4;

  // TODO: Make this work for arbitrarily big boards not just up to level 2
  const P = (x, y) => new V(x, y); // shorthand without new
  let center;
  if (position.level === 0) {
    center = V.zero;
  } else if (position.level === 1) {
    const levelFirstHexagon = V.rot(P(2 * wunit, 0), -60);
    center = V.rot(levelFirstHexagon, 60 * position.index);
  } else if (position.level === 2) {
    const axis =
      position.index % 2 ? V.rot(P(4 * wunit, 0), -60) : P(0, 3 * -unit);
    center = V.rot(axis, 60 * Math.floor(position.index / 2));
  } else {
    throw new Error("Invalid hexagon position.level");
  }
  const ps = [
    V.add(center, P(0, -unit)), // n
    V.add(center, P(wunit, -hunit)), // ne
    V.add(center, P(wunit, hunit)), // se
    V.add(center, P(0, unit)), // s
    V.add(center, P(-wunit, hunit)), // sw
    V.add(center, P(-wunit, -hunit)) // nw
  ];
  const points = ps.join(" ");

  const moveRobber = () => {
    if (enabled) {
      const disabled = false;
      const title = "Move Robber";
      const body = "Who would you like to take a resource from?";
      const buttons = adjacentPlayersToRob.map(player => ({
        text: player,
        callback: () =>
          api.games.playAction(gameId, "move_robber", {
            position,
            player
          })
      }));
      buttons.push({
        text: "No One",
        callback: () =>
          api.games.playAction(gameId, "move_robber", {
            position,
            player: null
          })
      });
      showModal({ disabled, title, body, buttons });
    }
  };

  // Style
  const terrainColor = {
    desert: "#F57C00",
    brick: "#D32F2F",
    lumber: "#5D4037",
    wool: "#689F38",
    grain: "#FBC02D",
    ore: "#7B1FA2"
  }[terrain];
  const terrainTextPos = center;
  const terrainTextStyle = { font: "bold 5rem Cinzel", fill: "white" };
  const tokenPos = V.add(center, P(0, 128));
  const tokenTextStyle = { font: "bold 5rem Cinzel", fill: terrainColor };
  const robberPos = V.add(center, P(0, -128));

  return (
    <g
      className={`hexagon ${enabled ? "can-move-robber" : ""}`}
      onClick={moveRobber}
    >
      <polygon
        points={points}
        fill={terrainColor}
        stroke="white"
        strokeWidth="1rem"
      />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        x={terrainTextPos.x}
        y={terrainTextPos.y}
        style={terrainTextStyle}
      >
        {terrain}
      </text>
      <circle cx={tokenPos.x} cy={tokenPos.y} r="50" fill="white" />
      {hasRobber && (
        <circle
          cx={robberPos.x}
          cy={robberPos.y}
          r="25"
          fill={terrainColor}
          stroke="white"
          strokeWidth="1rem"
        />
      )}
      <text
        x={tokenPos.x}
        y={tokenPos.y + 6} // HACK: +6 seems to center the sans-serif font
        dominantBaseline="middle"
        textAnchor="middle"
        style={tokenTextStyle}
      >
        {token}
      </text>
    </g>
  );
}

Hexagon.propTypes = {
  position: CatanTypes.HexPosition.isRequired,
  terrain: CatanTypes.Terrain.isRequired,
  token: PropTypes.number.isRequired,
  unit: PropTypes.number,
  hasRobber: PropTypes.bool.isRequired,
  availableRobberMove: PropTypes.bool.isRequired,
  adjacentPlayersToRob: PropTypes.arrayOf(PropTypes.string).isRequired
};

Hexagon.defaultProps = {
  unit: 256
};

export default Hexagon;
