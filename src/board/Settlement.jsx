import React from "react";
import PropTypes from "prop-types";
import V from "./Vector";
import CatanTypes from "../CatanTypes";

// TODO: Unit param should probably come from an upper global config state
function Settlement({ position, unit = 256 }) {
  const getVertex = (level, index) => {
    const hexCount = 6 + level * 12;
    if (index < 0 || hexCount < index)
      throw Error(`Invalid index=${index} for level=${level}`);

    const P = (x, y) => new V(x, y);
    const wunit = (Math.sqrt(3) / 2) * unit;

    let axis;
    if (level === 0) {
      axis = P(0, -unit);
    } else if (level === 1) {
      axis = index % 3 ? V.rot(P(wunit, 2.5 * -unit), -20) : P(0, 2 * -unit);
    } else if (level === 2) {
      const imod5 = index % 5;
      if (imod5 === 0) axis = P(0, 4 * -unit);
      else if (imod5 === 1) axis = V.rot(P(wunit, 3.5 * -unit), -12);
      else if (imod5 === 2) axis = V.rot(P(2 * wunit, 4 * -unit), -2 * 12);
      else if (imod5 === 3) axis = V.rot(P(3 * wunit, 3.5 * -unit), -3 * 12);
      else if (imod5 === 4) axis = V.rot(P(3 * wunit, 2.5 * -unit), -4 * 12);
    } else {
      throw new Error("Invalid vertex level");
    }

    const vertex = V.rot(axis, (360 / hexCount) * index);
    return vertex;
  };

  const center = getVertex(position.level, position.index);
  return (
    <>
      <circle cx={center.x} cy={center.y} r="32px" fill="#01579B" />
      <text
        x={center.x}
        y={center.y + 3} // HACK: +3 seems to center the sans-serif font
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ font: "bold 2rem Cinzel", fill: "#ffffff" }}
      >
        {position.index}
      </text>
    </>
  );
}

Settlement.propTypes = {
  position: CatanTypes.VertexPosition.isRequired,
  unit: PropTypes.number
};

Settlement.defaultProps = {
  unit: 256
};

export default Settlement;
