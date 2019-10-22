import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../Api";
import Hexagon from "./Hexagon";
import Settlement from "./Settlement";

function makeHexagons() {
  const hexagons = [
    {
      position: { level: 0, index: 0 },
      resource: "brick",
      token: 3
    }
  ];
  for (let i = 0; i < 6; i += 1)
    hexagons[1 + i] = {
      position: { level: 1, index: i },
      resource: _.sample(["brick", "lumber", "wool", "grain", "ore"]),
      token: i
    };
  for (let i = 0; i < 12; i += 1)
    hexagons[1 + 6 + i] = {
      position: { level: 2, index: i },
      resource: _.sample(["brick", "lumber", "wool", "grain", "ore"]),
      token: i
    };
  return hexagons;
}

function makeSettlements() {
  const settlements = [];
  const makeSett = (l, i) => ({
    position: { level: l, index: i },
    isCity: _.sample([true, false]),
    colour: "#404040",
    username: "loading"
  });
  for (let i = 0; i < 6; i += 1) settlements[i] = makeSett(0, i);
  for (let i = 0; i < 18; i += 1) settlements[6 + i] = makeSett(1, i);
  for (let i = 0; i < 30; i += 1) settlements[6 + 18 + i] = makeSett(2, i);
  return settlements;
}

function Board({ gameId }) {
  const [{ hexagons, settlements }, setState] = useState({
    hexagons: makeHexagons(),
    settlements: makeSettlements()
  });
  useEffect(() => {
    const fetchBoard = async () => {
      // Parallel fetching
      const [
        { data: board },
        {
          data: { players }
        }
      ] = await Promise.all([api.games.board(gameId), api.games.get(gameId)]);

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

      // Update board internal state
      setState({ hexagons: board.hexes, settlements: combinedSettlements });
    };
    fetchBoard();
  }, [gameId]);

  const unit = 256; // Radius of one hexagon in pixels

  const style = {
    width: "1024px",
    margin: "4rem auto",
    backgroundColor: "#202020"
  };

  const width = 2560;
  const height = 2560;
  const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;
  return (
    <div style={style}>
      <svg
        viewBox={viewBox}
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hexagons.map(hex => (
          <Hexagon
            key={Object.values(hex.position)}
            position={hex.position}
            resource={hex.resource}
            token={hex.token}
            unit={unit}
          />
        ))}
        {settlements.map(sett => (
          <Settlement // TODO: This is just showing
            key={Object.values(sett.position)}
            position={sett.position}
            isCity={sett.isCity}
            colour={sett.colour}
            username={sett.username}
          />
        ))}
      </svg>
    </div>
  );
}

Board.propTypes = {
  gameId: PropTypes.string.isRequired
  // TODO: This should be a number, but react-router treats match
  //       as strings. We could use regex /game/:id(//d+) as a safe mechanism
};

export default Board;
