import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
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

  if (!resources) return <i>Loading Resource List...</i>;
  return (
    <div>
      <h1 className="text-3xl">Resource List</h1>
      <h1>Brick: {amounts.brick}</h1>
      <h1>Lumber: {amounts.lumber}</h1>
      <h1>Wool: {amounts.wool}</h1>
      <h1>Grain: {amounts.grain}</h1>
      <h1>Ore: {amounts.ore}</h1>
    </div>
  );
}

ResourceList.propTypes = { gameId: PropTypes.string.isRequired };

export default ResourceList;
