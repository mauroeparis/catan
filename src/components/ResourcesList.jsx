import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function ResourcesList({ resources }) {
  let brickAmount = 0;
  let lumberAmount = 0;
  let woolAmount = 0;
  let grainAmount = 0;
  let oreAmount = 0;

  for (let i = 0; i < resources.length; i += 1)
    if (resources[i] === "brick") {
      brickAmount += 1;
    } else if (resources[i] === "lumber") {
      lumberAmount += 1;
    } else if (resources[i] === "wool") {
      woolAmount += 1;
    } else if (resources[i] === "grain") {
      grainAmount += 1;
    } else {
      oreAmount += 1;
    }

  return (
    <div>
      <h1>Brick: {brickAmount}</h1>
      <h1>Lumber: {lumberAmount}</h1>
      <h1>Wool: {woolAmount}</h1>
      <h1>Grain: {grainAmount}</h1>
      <h1>Ore: {oreAmount}</h1>
    </div>
  );
}

ResourcesList.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default ResourcesList;
