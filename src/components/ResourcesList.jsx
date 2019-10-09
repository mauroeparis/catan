import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function ResourcesList({ resources }) {
  const amounts = _.countBy(resources);

  return (
    <div>
      <h1>Brick: {amounts.brick}</h1>
      <h1>Lumber: {amounts.lumber}</h1>
      <h1>Wool: {amounts.wool}</h1>
      <h1>Grain: {amounts.grain}</h1>
      <h1>Ore: {amounts.ore}</h1>
    </div>
  );
}

ResourcesList.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default ResourcesList;
