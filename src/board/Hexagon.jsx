import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function Hexagon({ position, resource, token }) {
  // Point positioning
  const scale = 256;
  const width = Math.sqrt(3) * scale;
  const radius = scale;
  const height = 2 * radius;
  // (√3/2, 0), (√3, 1/2), (√3, 3/2), (√3/2, 2), (0, 3/2), (0, 1/2)
  const n = [width / 2, 0];
  const ne = [width, (1 / 4) * height];
  const se = [width, (3 / 4) * height];
  const s = [width / 2, height];
  const sw = [0.0, (3 / 4) * height];
  const nw = [0.0, (1 / 4) * height];
  const points = `${n} ${ne} ${se} ${s} ${sw} ${nw}`;
  const viewBox = `0 0 ${width} ${height}`;

  // Style
  const resourceColor = {
    brick: "#B71C1C",
    lumber: "#3E2723",
    wool: "#1B5E20",
    grain: "#FBC02D",
    ore: "#263238"
  }[resource];
  const resourceTextStyle = { font: "bold 5rem sans-serif", fill: "white" };
  const tokenTextStyle = { font: "bold 5rem sans-serif", fill: resourceColor };
  const tokenPos = { x: 50, y: 65 };

  return (
    <svg
      viewBox={viewBox}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        fill={resourceColor}
        stroke="black"
        strokeWidth="1rem"
      />
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        style={resourceTextStyle}
      >
        {resource}
      </text>
      <circle cx={`${tokenPos.x}%`} cy={`${tokenPos.y}%`} r="50" fill="white" />
      <text
        x={`${tokenPos.x}%`}
        y={`${tokenPos.y + 1}%`}
        dominantBaseline="middle"
        textAnchor="middle"
        style={tokenTextStyle}
      >
        {token}
      </text>
    </svg>
  );
}

Hexagon.propTypes = {
  position: CatanTypes.HexPosition.isRequired,
  resource: CatanTypes.Resource.isRequired,
  token: PropTypes.number.isRequired
};

export default Hexagon;
