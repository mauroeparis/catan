import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

const pAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];

function Hexagon({ position, resource, token }) {
  // Point positioning
  const unit = 256;
  const width = Math.sqrt(3) * unit;
  const radius = unit;
  const height = 2 * radius;
  const wunit = width / 2;
  const hunit = height / 4;

  const center = position.level === 0 ? [0, 0] : [wunit, 3 * hunit]; // XXX: Will be removed afterwards
  const ps = [
    pAdd(center, [0, -unit]), // n
    pAdd(center, [wunit, -hunit]), // ne
    pAdd(center, [wunit, hunit]), // se
    pAdd(center, [0, unit]), // s
    pAdd(center, [-wunit, hunit]), // sw
    pAdd(center, [-wunit, -hunit]) // nw
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
  const resourceTextPos = { x: center[0], y: center[1] };
  const resourceTextStyle = { font: "bold 5rem sans-serif", fill: "white" };
  const tokenTextStyle = { font: "bold 5rem sans-serif", fill: resourceColor };
  const tokenPos = { x: center[0] + 0, y: center[1] + 128 };

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
