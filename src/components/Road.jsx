import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";
import getVertex from "../Vertex";

export default function Road({
  vertices: [v, w],
  colour,
  username,
  unit = 256
}) {
  const vmap = getVertex(v.level, v.index, unit);
  const wmap = getVertex(w.level, w.index, unit);
  return (
    <g className="road">
      <line
        x1={vmap.x}
        y1={vmap.y}
        x2={wmap.x}
        y2={wmap.y}
        stroke={colour}
        strokeWidth="1.5rem"
        strokeLinecap="round"
      />
    </g>
  );
}

Road.propTypes = {
  vertices: CatanTypes.RoadPosition.isRequired,
  colour: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  unit: PropTypes.number
};

Road.defaultProps = {
  unit: 256
};
