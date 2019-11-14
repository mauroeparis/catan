import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
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
    const disabled = false;
    const title = "Build Road";

    const body =
      "It will cost you 1 brick and 1 lumber. Are you sure you want to build it?";
    const buttons = [
      {
        text: "Accept",
        callback: () => api.games.playAction(gameId, "build_road", [v, w])
      },
      {
        text: "Cancel"
      }
    ];
    window.showModal({ disabled, title, body, buttons });
  };
  const vmap = getVertex(v.level, v.index, unit);
  const wmap = getVertex(w.level, w.index, unit);
  const { gameId } = useParams();
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
