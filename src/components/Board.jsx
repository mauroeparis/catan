import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import api from "../Api";
import GameContext, { PLAY_KNIGHT, PLAY_ROAD_BUILDING } from "../GameContext";
import CatanTypes from "../CatanTypes";
import Hexagon from "./Hexagon";
import Settlement, { BuildIndicator } from "./Settlement";
import Road, { BuildRoadIndicator } from "./Road";

export default function Board() {
  const { phase, gameId } = useContext(GameContext);
  const [
    {
      hexagons,
      settlements,
      roads,
      availableBuilds,
      availableUpgrades,
      availableRoadSlots,
      robber
    },
    setState
  ] = useState({
    hexagons: null,
    settlements: null,
    roads: null,
    availableBuilds: null,
    availableUpgrades: null,
    availableRoadSlots: null,
    robber: null
  });

  useEffect(() => {
    const fetchBoard = async () => {
      // Parallel fetching
      const [
        { data: board },
        {
          data: { players, robber: robberPosition }
        },
        { data: actions }
      ] = await Promise.all([
        api.games.board(gameId),
        api.games.get(gameId),
        api.games.actions(gameId)
      ]);

      // Prepare fetched settlements for re-rendering by
      // combining all vertices from all players in the same array
      const combinedSettlements = _.flatten(
        // Get built vertices from players
        players.map(p =>
          // Concat those vertices
          _.concat(
            // Settlements to usable vertex
            p.settlements.map(s => ({
              position: s,
              isCity: false,
              colour: p.colour,
              username: p.username
            })),
            // Cities to usable vertex
            p.cities.map(c => ({
              position: c,
              isCity: true,
              colour: p.colour,
              username: p.username
            }))
          )
        )
      );

      // Combine all roads from all players in the same array
      const builtRoads = _.flatten(
        // Get built roads from players
        players.map(p =>
          // Expand roads with more information like username and colour
          p.roads.map(r => ({
            vertices: r,
            colour: p.colour,
            username: p.username
          }))
        )
      );

      // Returns empty list if action not available, else action-of-type payload
      const getPayload = type =>
        (actions.find(a => a.type === type) || { payload: [] }).payload;

      // Available places to move the robber changes if playing knight card
      const availableRobberMoves = [PLAY_KNIGHT].includes(phase)
        ? getPayload("play_knight_card")
        : getPayload("move_robber");

      // Combine board.hexes with information related to the robber
      const robberInfoForHex = hex => {
        const move = availableRobberMoves.find(a =>
          _.isEqual(a.position, hex.position)
        );
        return {
          hasRobber: _.isEqual(hex.position, robberPosition),
          availableRobberMove: Boolean(move),
          adjacentPlayersToRob: move ? move.players : []
        };
      };
      const combinedHexagons = board.hexes.map(h => ({
        ...h,
        ...robberInfoForHex(h)
      }));

      // Available roads changes if playing road_building card
      const aRoadSlots = [PLAY_ROAD_BUILDING].includes(phase)
        ? getPayload("play_road_building_card")
        : getPayload("build_road");

      // Available builds and upgrades
      const aBuilds = getPayload("build_settlement");
      const aUpgrades = getPayload("upgrade_city");

      // Update board internal state
      setState({
        hexagons: combinedHexagons,
        settlements: combinedSettlements,
        roads: builtRoads,
        availableBuilds: aBuilds,
        availableUpgrades: aUpgrades,
        availableRoadSlots: aRoadSlots,
        robber: robberPosition
      });
    };
    fetchBoard();
    const interval = setInterval(() => fetchBoard(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [phase, gameId]);

  // !hexagons is a weird way of saying nothing has loaded yet
  if (!hexagons) return <i>Loading Board...</i>;
  return (
    <BoardContainer
      hexagons={hexagons}
      settlements={settlements}
      roads={roads}
      availableBuilds={availableBuilds}
      availableUpgrades={availableUpgrades}
      availableRoadSlots={availableRoadSlots}
      robber={robber}
    />
  );
}

function BoardContainer({
  hexagons,
  settlements,
  roads,
  availableBuilds,
  availableUpgrades,
  availableRoadSlots,
  robber
}) {
  const unit = 256; // Radius of one hexagon in pixels
  const width = 2560;
  const height = 2560;
  const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;
  const playerColours = {
    red: "#F44336",
    blue: "#2196F3",
    yellow: "#FFC107",
    white: "#4CAF50"
  };
  return (
    <div className="board">
      <svg
        viewBox={viewBox}
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hexagons.map(hex => (
          <Hexagon
            key={Object.values(hex.position)}
            position={hex.position}
            terrain={hex.terrain}
            token={hex.token}
            unit={unit}
            hasRobber={hex.hasRobber}
            availableRobberMove={hex.availableRobberMove}
            adjacentPlayersToRob={hex.adjacentPlayersToRob}
          />
        ))}
        {availableRoadSlots.map(road => (
          <BuildRoadIndicator key={JSON.stringify(road)} vertices={road} />
        ))}
        {roads.map(road => (
          <Road
            // TODO: Use better keys on maps
            key={JSON.stringify(road.vertices)}
            vertices={road.vertices}
            colour={playerColours[road.colour]}
            username={road.username}
          />
        ))}
        {settlements.map(sett => (
          <Settlement
            key={Object.values(sett.position)}
            position={sett.position}
            isCity={sett.isCity}
            colour={playerColours[sett.colour]}
            username={sett.username}
            canUpgrade={_.some(availableUpgrades, sett.position)}
          />
        ))}
        {availableBuilds.map(vert => (
          <BuildIndicator key={Object.values(vert)} position={vert} />
        ))}
      </svg>
    </div>
  );
}

BoardContainer.propTypes = {
  hexagons: PropTypes.arrayOf(CatanTypes.Hex),
  settlements: PropTypes.arrayOf(
    PropTypes.shape({
      position: CatanTypes.VertexPosition.isRequired,
      isCity: PropTypes.bool.isRequired,
      colour: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  ),
  roads: PropTypes.arrayOf(
    PropTypes.shape({
      vertices: CatanTypes.RoadPosition.isRequired,
      colour: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  ),
  availableBuilds: PropTypes.arrayOf(CatanTypes.VertexPosition),
  availableUpgrades: PropTypes.arrayOf(CatanTypes.VertexPosition),
  availableRoadSlots: PropTypes.arrayOf(CatanTypes.RoadPosition),
  robber: CatanTypes.HexPosition.isRequired
};

BoardContainer.defaultProps = {
  hexagons: null,
  settlements: null,
  roads: null,
  availableBuilds: null,
  availableUpgrades: null,
  availableRoadSlots: null
};
