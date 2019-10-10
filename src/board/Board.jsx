import React, { useState, useEffect } from "react";
import _ from "lodash";
import api from "../Api";
import Hexagon from "./Hexagon";
import Settlemet from "./Settlement";

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
  for (let i = 0; i < 6; i += 1)
    settlements[i] = {
      position: { level: 0, index: i }
    };
  for (let i = 0; i < 18; i += 1)
    settlements[6 + i] = {
      position: { level: 1, index: i }
    };
  for (let i = 0; i < 30; i += 1)
    settlements[6 + 18 + i] = {
      position: { level: 2, index: i }
    };
  return settlements;
}

function Board() {
  const settlements = makeSettlements();
  const [hexagons, setHexagons] = useState(makeHexagons());
  useEffect(() => {
    const fetchBoard = async () => {
      const gameId = 2; // TODO: This should come from an upper state
      const response = await api.games.board(gameId);
      setHexagons(response.data.hexes);
    };
    fetchBoard();
  }, []);

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
          <Settlemet // TODO: This is just showing
            key={Object.values(sett.position)}
            position={sett.position}
          />
        ))}
      </svg>
    </div>
  );
}

export default Board;
