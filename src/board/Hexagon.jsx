import React from "react";
import PropTypes from "prop-types";
import V from "./Vector";
import CatanTypes from "../CatanTypes";

function Hexagon({ position, resource, token, unit = 256 }) {
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

  // Style
  const resourceColor = {
    brick: "#B71C1C",
    lumber: "#3E2723",
    wool: "#1B5E20",
    grain: "#FBC02D",
    ore: "#263238"
  }[resource];
  const resourceTextPos = center;
  const resourceTextStyle = { font: "bold 5rem Cinzel", fill: "white" };
  const tokenPos = V.add(center, P(0, 128));
  const tokenTextStyle = { font: "bold 5rem Cinzel", fill: resourceColor };

  return (
    <>
      <polygon
        points={points}
        fill={resourceColor}
        stroke="white"
        strokeWidth="1rem"
      />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        x={resourceTextPos.x}
        y={resourceTextPos.y}
        style={resourceTextStyle}
      >
        {resource}
      </text>
      <circle cx={tokenPos.x} cy={tokenPos.y} r="50" fill="white" />
      <text
        x={tokenPos.x}
        y={tokenPos.y + 6} // HACK: +6 seems to center the sans-serif font
        dominantBaseline="middle"
        textAnchor="middle"
        style={tokenTextStyle}
      >
        {token}
      </text>
    </>
  );
}

Hexagon.propTypes = {
  position: CatanTypes.HexPosition.isRequired,
  resource: CatanTypes.Resource.isRequired,
  token: PropTypes.number.isRequired,
  unit: PropTypes.number
};

Hexagon.defaultProps = {
  unit: 256
};

export default Hexagon;
