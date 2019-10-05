import React from "react";
import PropTypes from "prop-types";
import V from "./Vector";
import CatanTypes from "../CatanTypes";

function Hexagon({ position, resource, token }) {
  // Point positioning
  const unit = 256;
  const width = Math.sqrt(3) * unit;
  const radius = unit;
  const height = 2 * radius;
  const wunit = width / 2;
  const hunit = height / 4;

  const P = (x, y) => new V(x, y); // shorthand without new
  const center = position.level === 0 ? V.zero : P(wunit, 3 * hunit); // XXX: Will be removed afterwards
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
  const resourceTextStyle = { font: "bold 5rem sans-serif", fill: "white" };
  const tokenPos = V.add(center, P(0, 128));
  const tokenTextStyle = { font: "bold 5rem sans-serif", fill: resourceColor };

  return (
    <>
      <polygon
        points={points}
        fill={resourceColor}
        stroke="black"
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
  token: PropTypes.number.isRequired
};

export default Hexagon;
