import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CatanTypes from "../CatanTypes";

function ResourcesList({ resources, gameId }) {
  const amounts = _.countBy(resources);

  return (
    <div>
      <h1 className="text-3xl">Resource List</h1>
      <h1>Brick: {amounts.brick}</h1>
      <h1>Lumber: {amounts.lumber}</h1>
      <h1>Wool: {amounts.wool}</h1>
      <h1>Grain: {amounts.grain}</h1>
      <h1>Ore: {amounts.ore}</h1>
      <Link to={`/game/${gameId}/bankTrade`} className="w-full text-center">
        <input type="button" value="Trade with bank" />
      </Link>
    </div>
  );
}

ResourcesList.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired,
  gameId: PropTypes.string.isRequired
};

export default ResourcesList;
