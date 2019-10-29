import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";
import api from "../Api";

function ResourceList({ gameId }) {
  const [{ resources }, setState] = useState({ resources: null });
  const amounts = _.countBy(resources);

  useEffect(() => {
    const fetchResources = async () => {
      const player = await api.games.player(gameId);
      setState({ resources: player.data.resources });
    };
    fetchResources();
    const interval = setInterval(() => fetchResources(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  // TODO: It would be nice to implement a custom hook like this
  // usePolling(async () => {
  //   const player = await api.games.player(gameId);
  //   setState({ resources: player.data.resources });
  // }, [gameId]);

  if (!resources) return <i>Loading Resource List...</i>;
  return <ResourceListContainer amounts={amounts} />;
}

ResourceList.propTypes = { gameId: PropTypes.string.isRequired };

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

export default ResourceList;
