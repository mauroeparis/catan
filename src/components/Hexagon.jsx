import React, { useContext } from "react";
import PropTypes from "prop-types";

import V from "../Vector";
import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext, { PLAY_KNIGHT, SET_DEFAULT } from "../GameContext";
import { ReactComponent as BrickIcon } from "../public/icons/brick.svg";
import { ReactComponent as WoolIcon } from "../public/icons/sheep.svg";
import { ReactComponent as OreIcon } from "../public/icons/stone.svg";
import { ReactComponent as LumberIcon } from "../public/icons/trees.svg";
import { ReactComponent as GrainIcon } from "../public/icons/wheat.svg";
import { ReactComponent as DesertIcon } from "../public/icons/desert.svg";
import { ReactComponent as ThiefIcon } from "../public/icons/thiefToken.svg";

function Hexagon({
  position,
  terrain,
  token,
  unit = 256,
  hasRobber,
  availableRobberMove,
  adjacentPlayersToRob
}) {
  const { phase, gameId, gameDispatch, showModal } = useContext(GameContext);
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
      const robFrom = async player => {
        await api.games.playAction(gameId, "move_robber", { position, player });
        gameDispatch({ type: SET_DEFAULT });
      };
      const disabled = false;
      const title = "Move Robber";
      const body = "Who would you like to take a resource from?";
      const buttons = adjacentPlayersToRob.map(player => ({
        text: player,
        callback: () => robFrom(player)
      }));
      buttons.push({ text: "No One", callback: () => robFrom(null) });
      showModal({ disabled, title, body, buttons });
    }
  };

  // Style
  const terrainColor = {
    desert: "#B7791F",
    brick: "#9B2C2C",
    lumber: "#22543D",
    wool: "#48BB78",
    grain: "#ECC94B",
    ore: "#4A5568"
  }[terrain];

  const terrainIconPos = V.add(center, P(-56.5, -64));
  const tokenPos = V.add(center, P(0, 128));
  const tokenTextStyle = { font: "bold 5rem Cinzel", fill: "#2d3748" };
  const robberPos = V.add(center, P(-75, -198));

  const terrainIconColor = {
    desert: "#ECC94B",
    brick: "#ED8936",
    lumber: "#48BB78",
    wool: "#22543D",
    grain: "#744210",
    ore: "#A0AEC0"
  }[terrain];
  const terrainIconSize = "115";

  const terrainIcon = {
    desert: (
      <DesertIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    ),
    brick: (
      <BrickIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    ),
    lumber: (
      <LumberIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    ),
    wool: (
      <WoolIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    ),
    grain: (
      <GrainIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    ),
    ore: (
      <OreIcon
        x={terrainIconPos.x}
        y={terrainIconPos.y}
        width={terrainIconSize}
        height={terrainIconSize}
        color={terrainIconColor}
      />
    )
  }[terrain];

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
      {terrainIcon}
      <circle cx={tokenPos.x} cy={tokenPos.y} r="55" fill="#e2e8f0" />
      {hasRobber && (
        <ThiefIcon
          x={robberPos.x}
          y={robberPos.y}
          fill="black"
          color="black"
          width="150"
          height="150"
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
