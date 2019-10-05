import React from "react";
import Hexagon from "./Hexagon";

function Board() {
  const style = {
    width: "256px",
    margin: "4rem auto",
    backgroundColor: "#404040"
  };

  const hexagons = [
    {
      position: { level: 0, index: 0 },
      resource: "brick",
      token: 3
    },
    {
      position: { level: 1, index: 0 },
      resource: "ore",
      token: 6
    }
  ];

  const width = 2048;
  const height = 2048;
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
