import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../Api";
import Container from "./Container";

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
  return <Container amounts={amounts} />;
}

ResourceList.propTypes = { gameId: PropTypes.string.isRequired };

export default ResourceList;
