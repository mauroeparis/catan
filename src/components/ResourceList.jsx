import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";
import api from "../Api";

// TODO: It would be nice to implement a custom hook like this
// usePolling(async () => {
//   const player = await api.games.player(gameId);
//   setState({ resources: player.data.resources });
// }, [gameId]);

export function ResourceList({ gameId }) {
  const [{ resources }, setState] = useState({ resources: null });

  useEffect(() => {
    const fetchResources = async () => {
      const player = await api.games.player(gameId);
      setState({ resources: player.data.resources });
    };
    fetchResources();
    const interval = setInterval(() => fetchResources(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  if (!resources) return <i>Loading Resource List...</i>;
  return <ResourceListContainer resources={resources} />;
}

ResourceList.propTypes = { gameId: PropTypes.string.isRequired };

export function ResourceListContainer({ resources }) {
  const amounts = _.countBy(resources);
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
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default { ResourceList, ResourceListContainer };
