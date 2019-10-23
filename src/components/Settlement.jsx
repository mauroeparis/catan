import React from "react";
import PropTypes from "prop-types";
import V from "../Vector";
import CatanTypes from "../CatanTypes";
import api from "../Api";

const getVertex = (level, index, unit) => {
  const hexCount = 6 + level * 12;
  if (index < 0 || hexCount < index)
    throw Error(`Invalid index=${index} for level=${level}`);

  const P = (x, y) => new V(x, y);
  const wunit = (Math.sqrt(3) / 2) * unit;

  let axis;
  if (level === 0) {
    axis = P(0, -unit);
  } else if (level === 1) {
    axis = index % 3 ? V.rot(P(wunit, 2.5 * -unit), -20) : P(0, 2 * -unit);
  } else if (level === 2) {
    const imod5 = index % 5;
    if (imod5 === 0) axis = P(0, 4 * -unit);
    else if (imod5 === 1) axis = V.rot(P(wunit, 3.5 * -unit), -12);
    else if (imod5 === 2) axis = V.rot(P(2 * wunit, 4 * -unit), -2 * 12);
    else if (imod5 === 3) axis = V.rot(P(3 * wunit, 3.5 * -unit), -3 * 12);
    else if (imod5 === 4) axis = V.rot(P(3 * wunit, 2.5 * -unit), -4 * 12);
  } else {
    throw new Error("Invalid vertex level");
  }

  const vertex = V.rot(axis, (360 / hexCount) * index);
  return vertex;
};

// TODO: Unit param should probably come from an upper global config state
export default function Settlement({
  position,
  unit = 256,
  isCity,
  colour,
  username,
  canUpgrade
}) {
  const tryUpgrade = () => {
    const gameId = 1; // TODO: Should come from an upper state
    const t = "Upgrade City\nIt costs 3 ore and 2 grain.";
    if (canUpgrade && window.confirm(t))
      api.games.playAction(gameId, "upgrade_city", position);
  };
  const center = getVertex(position.level, position.index, unit);
  return (
    <g className="settlement" onClick={tryUpgrade}>
      <circle
        cx={center.x}
        cy={center.y}
        r={isCity ? "48px" : "32px"}
        fill={colour}
        stroke={canUpgrade ? "#E91E63" : "white"}
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
  const doBuild = () => {
    const gameId = 1; // TODO: Should come from an upper state
    const t = "Build Settlement\nIt costs 1 of brick, lumber, wool and grain.";
    if (window.confirm(t))
      api.games.playAction(gameId, "build_settlement", position);
  };
  const center = getVertex(position.level, position.index, unit);
  return (
    <circle
      className="build-indicator"
      onClick={doBuild}
      cx={center.x}
      cy={center.y}
      r="48px"
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
