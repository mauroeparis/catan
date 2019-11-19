import React, { useContext } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import CatanTypes from "../CatanTypes";
import getVertex from "../Vertex";
import api from "../Api";
import GameContext, {
  DEFAULT,
  PLAY_ROAD_BUILDING,
  ADD_ROAD_PLAY_ROAD_BUILDING
} from "../GameContext";

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
  const { phase, gameId, roads, gameDispatch, showModal } = useContext(
    GameContext
  );
  const validPhase = [DEFAULT, PLAY_ROAD_BUILDING].includes(phase);
  const enabled = validPhase;

  // If PLAY_ROAD_BUILDING, check that roads has this road
  const isSelectedByRoadBuilding =
    phase === PLAY_ROAD_BUILDING &&
    _.differenceWith(roads, [[v, w]], _.isEqual).length < roads.length;

  const doBuild = () => {
    if (phase === DEFAULT) {
      const disabled = false;
      const title = "Build Road";
      const body =
        "It will cost you 1 brick and 1 lumber. Are you sure you want to build it?";
      const buttons = [
        {
          text: "Accept",
          primary: true,
          callback: () => api.games.playAction(gameId, "build_road", [v, w])
        },
        {
          text: "Cancel"
        }
      ];
      showModal({ disabled, title, body, buttons });
    } else if (phase === PLAY_ROAD_BUILDING && !isSelectedByRoadBuilding) {
      gameDispatch({ type: ADD_ROAD_PLAY_ROAD_BUILDING, road: [v, w] });
    }
  };
  const vmap = getVertex(v.level, v.index, unit);
  const wmap = getVertex(w.level, w.index, unit);
  return (
    <line
      className={`
        build-road-indicator
        ${enabled ? "" : "disabled"}
        ${isSelectedByRoadBuilding ? "road-building-selected" : ""}
      `}
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
