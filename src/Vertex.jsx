// Maps (level, index) coordinate system to actual board coordinates

import V from "./Vector";

export default function getVertex(level, index, unit) {
  // Given a unit (equivalent to hexagon radius in displayed svg)
  // calculates the svg coordinate based on the (level, index) coordinate system
  const hexCount = 6 + level * 12;
  if (index < 0 || hexCount < index)
    throw Error(`Invalid index=${index} for level=${level}`);

  const P = (x, y) => new V(x, y);
  const wunit = (Math.sqrt(3) / 2) * unit;

  let axis;
  if (level === 0) {
    axis = P(0, -unit);
  } else if (level === 1) {
    const imod3 = index % 3;
    if (imod3 === 0) axis = P(0, 2 * -unit);
    else if (imod3 === 1) axis = V.rot(P(wunit, 2.5 * -unit), -20);
    else if (imod3 === 2) axis = V.rot(P(2 * wunit, 2 * -unit), -2 * 20);
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
}
