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
    }
  ];

  return (
    <div style={style}>
      {hexagons.map(hex => (
        <Hexagon
          key={hex.position}
          position={hex.position}
          resource={hex.resource}
          token={hex.token}
        />
      ))}
    </div>
  );
}

export default Board;
