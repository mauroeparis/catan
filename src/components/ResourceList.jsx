import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";

import GameContext from "../GameContext";
import CatanTypes from "../CatanTypes";
import api from "../Api";

// TODO: It would be nice to implement a custom hook like this
// usePolling(async () => {
//   const player = await api.games.player(gameId);
//   setState({ resources: player.data.resources });
// }, [gameId]);

export default function ResourceList() {
  const { gameId } = useContext(GameContext);
  const [{ resources }, setState] = useState({ resources: null });
  const { addToast } = useToasts();

  useEffect(() => {
    const fetchResources = async () => {
      const player = await api.games.player(gameId);

      // Get a dict with resources as keys and the ocurences as values
      const newResourcesCount = _.countBy(player.data.resources);
      const currResourcesCount = _.countBy(resources);
      // Check if it is necessary to update state
      if (
        resources === null || // First render?
        !_.isEqual(currResourcesCount, newResourcesCount) // Something changed?
      ) {
        // Merge both calculating the difference of old and new value
        const resourceMerge = _.mergeWith(
          currResourcesCount,
          newResourcesCount,
          (currV, newV) => {
            if (_.isNumber(currV) && _.isNumber(newV)) {
              return newV - currV;
            }
            return _.isNumber(currV) ? currV : newV;
          }
        );

        // Inform about resources that have gone up
        const upResources = _.pickBy(resourceMerge, elem => elem > 0);
        if (!_.isEmpty(upResources)) {
          const succToastText = _.toPairs(upResources).map(
            elem => `+${elem[1]} ${elem[0].toUpperCase()} `
          );
          addToast(succToastText, { appearance: "success", autoDismiss: true });
        }

        // Inform about resources that have gone down
        const downResources = _.pickBy(resourceMerge, elem => elem < 0);
        if (!_.isEmpty(downResources)) {
          const warnToastText = _.toPairs(downResources).map(
            elem => `${elem[1]} ${elem[0].toUpperCase()} `
          );
          addToast(warnToastText, { appearance: "error", autoDismiss: true });
        }
        setState({ resources: player.data.resources });
      }
    };
    fetchResources();
    const interval = setInterval(() => fetchResources(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [addToast, gameId, resources]);

  if (!resources) return <i>Loading Resource List...</i>;
  return <ResourceListContainer resources={resources} />;
}

export function ResourceListContainer({ resources }) {
  const amounts = _.countBy(resources);
  return (
    <div className="resource-list">
      <h1>Resource List</h1>
      <ul>
        <li>Brick: {amounts.brick || 0}</li>
        <li>Lumber: {amounts.lumber || 0}</li>
        <li>Wool: {amounts.wool || 0}</li>
        <li>Grain: {amounts.grain || 0}</li>
        <li>Ore: {amounts.ore || 0}</li>
      </ul>
    </div>
  );
}

ResourceListContainer.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};
