import React from "react";
import _ from "lodash";
import Hexagon from "./Hexagon";

function Board() {
  const style = {
    width: "1024px",
    margin: "4rem auto",
    backgroundColor: "#202020"
  };

  const hexagons = [
    {
      position: { level: 0, index: 0 },
      resource: "brick",
      token: 3
    }
  ];

  // Add Level 1
  for (let i = 0; i < 6; i += 1) {
    hexagons[1 + i] = {
      position: { level: 1, index: i },
      resource: _.sample(["brick", "lumber", "wool", "grain", "ore"]),
      token: i
    };
  }
  // Add Level 2
  for (let i = 0; i < 12; i += 1) {
    hexagons[1 + 6 + i] = {
      position: { level: 2, index: i },
      resource: _.sample(["brick", "lumber", "wool", "grain", "ore"]),
      token: i
    };
  }

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
          />
        ))}
      </svg>
    </div>
  );
}

export default Board;
