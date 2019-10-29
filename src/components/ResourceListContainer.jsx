import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function ResourceListContainer({ amounts }) {
  return (
    <div className="resource-list">
      <h1>Resource List</h1>
      <ul>
        <li>Brick: {amounts.brick}</li>
        <li>Lumber: {amounts.lumber}</li>
        <li>Wool: {amounts.wool}</li>
        <li>Grain: {amounts.grain}</li>
        <li>Ore: {amounts.ore}</li>
      </ul>
    </div>
  );
}

ResourceListContainer.propTypes = {
  amounts: PropTypes.shape(CatanTypes.amounts).isRequired
};

export default ResourceListContainer;
