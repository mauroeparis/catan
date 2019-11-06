import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";
import getVertex from "../Vertex";
import api from "../Api";

export default function Road({
  vertices: [v, w],
  colour,
  username,
  unit = 256
}) {
  const vmap = getVertex(v.level, v.index, unit);
  const wmap = getVertex(w.level, w.index, unit);
  return (
    <line
      className="road"
      x1={vmap.x}
      y1={vmap.y}
      x2={wmap.x}
      y2={wmap.y}
      stroke={colour}
    />
  );
}

Road.propTypes = {
  vertices: CatanTypes.RoadPosition.isRequired,
  colour: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  unit: PropTypes.number // eslint-disable-line react/require-default-props
};

export function BuildRoadIndicator({ vertices: [v, w], unit = 256 }) {
  const doBuild = () => {
    const gameId = 1; // TODO: Should come from an upper state
    const t = "Build Road\nIt costs 1 brick and 1 lumber.";
    if (window.confirm(t)) api.games.playAction(gameId, "build_road", [v, w]);
  };
  const vmap = getVertex(v.level, v.index, unit);
  const wmap = getVertex(w.level, w.index, unit);
  return (
    <line
      className="build-road-indicator"
      onClick={doBuild}
      x1={vmap.x}
      y1={vmap.y}
      x2={wmap.x}
      y2={wmap.y}
    />
  );
}

BuildRoadIndicator.propTypes = {
  vertices: CatanTypes.RoadPosition.isRequired,
  unit: PropTypes.number // eslint-disable-line react/require-default-props
};
