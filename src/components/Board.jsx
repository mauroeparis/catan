import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../Api";
import CatanTypes from "../CatanTypes";
import Hexagon from "./Hexagon";
import Settlement, { BuildIndicator } from "./Settlement";
import Road, { BuildRoadIndicator } from "./Road";

export default function Board({ gameId }) {
  const [
    {
      hexagons,
      settlements,
      roads,
      availableBuilds,
      availableUpgrades,
      availableRoadSlots,
      adjacentPlayersPerHex
    },
    setState
  ] = useState({
    hexagons: null,
    settlements: null,
    roads: null,
    availableBuilds: null,
    availableUpgrades: null,
    availableRoadSlots: null,
    adjacentPlayersPerHex: null
  });

  useEffect(() => {
    const fetchBoard = async () => {
      // Parallel fetching
      const [
        { data: board },
        {
          data: { players }
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

      // Available builds and upgrades
      const aBuilds = actions.find(a => a.type === "build_settlement").payload;
      const aUpgrades = actions.find(a => a.type === "upgrade_city").payload;
      const aRoadSlots = actions.find(a => a.type === "build_road").payload;
      const adjacentPlayers = actions.find(a => a.type === "move_robber").payload;

      // Update board internal state
      setState({
        hexagons: board.hexes,
        settlements: combinedSettlements,
        roads: builtRoads,
        availableBuilds: aBuilds,
        availableUpgrades: aUpgrades,
        availableRoadSlots: aRoadSlots,
        adjacentPlayersPerHex: adjacentPlayers
      });
    };
    fetchBoard();
    const interval = setInterval(() => fetchBoard(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

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
      adjacentPlayersPerHex={adjacentPlayersPerHex}
    />
  );
}

Board.propTypes = {
  gameId: PropTypes.string.isRequired
  // TODO: This should be a number, but react-router treats match
  // as strings. We could use regex /game/:id(//d+) as a safe mechanism
};

function BoardContainer({
  hexagons,
  settlements,
  roads,
  availableBuilds,
  availableUpgrades,
  availableRoadSlots,
  adjacentPlayersPerHex
}) {
  const unit = 256; // Radius of one hexagon in pixels
  const width = 2560;
  const height = 2560;
  const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;
  const adjacentPlayers = position => {
    const playersForHex = adjacentPlayersPerHex.find(hp =>
      _.isEqual(hp.position, position)
    );
    return playersForHex ? playersForHex.players : [];
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
            adjacentPlayers={adjacentPlayers(hex.position)}
            terrain={hex.terrain}
            token={hex.token}
            unit={unit}
          />
        ))}
        {availableRoadSlots.map(road => (
          <BuildRoadIndicator
            key={JSON.stringify(road.vertices)}
            vertices={road}
          />
        ))}
        {roads.map(road => (
          <Road
            // TODO: Use better keys on maps
            key={JSON.stringify(road.vertices)}
            vertices={road.vertices}
            colour={road.colour}
            username={road.username}
          />
        ))}
        {settlements.map(sett => (
          <Settlement
            key={Object.values(sett.position)}
            position={sett.position}
            isCity={sett.isCity}
            colour={sett.colour}
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
  adjacentPlayersPerHex: PropTypes.arrayOf(
    PropTypes.shape({
      position: CatanTypes.HexPosition.isRequired,
      players: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  )
};

BoardContainer.defaultProps = {
  hexagons: null,
  settlements: null,
  roads: null,
  availableBuilds: null,
  availableUpgrades: null,
  availableRoadSlots: null,
  adjacentPlayersPerHex: null
};
