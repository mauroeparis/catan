import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";

import GameContext from "../GameContext";
import CatanTypes from "../CatanTypes";
import api from "../Api";
import { ReactComponent as BrickIcon } from "../public/icons/brick.svg";
import { ReactComponent as WoolIcon } from "../public/icons/sheep.svg";
import { ReactComponent as OreIcon } from "../public/icons/stone.svg";
import { ReactComponent as LumberIcon } from "../public/icons/trees.svg";
import { ReactComponent as GrainIcon } from "../public/icons/wheat.svg";

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
  const resourcesData = {
    brick: {
      icon: <BrickIcon className="w-8 self-center" />,
      amount: amounts.brick || 0,
      styleClasses: "bg-red-800 text-orange-500 rounded-l-lg"
    },
    lumber: {
      icon: <LumberIcon className="w-8 self-center" />,
      amount: amounts.lumber || 0,
      styleClasses: "bg-green-900 text-green-500"
    },
    grain: {
      icon: <GrainIcon className="w-8 self-center" />,
      amount: amounts.grain || 0,
      styleClasses: "bg-yellow-500 text-yellow-900"
    },
    ore: {
      icon: <OreIcon className="w-8 self-center" />,
      amount: amounts.ore || 0,
      styleClasses: "bg-gray-700 text-gray-500"
    },
    wool: {
      icon: <WoolIcon className="w-8 self-center" />,
      amount: amounts.wool || 0,
      styleClasses: "bg-green-500 text-green-900 rounded-r-lg"
    }
  };

  return (
    <div>
      <ul className="flex flex-row">
        {Object.keys(resourcesData).map(resource => (
          <li
            className={`flex flex-col p-3 text-center ${resourcesData[resource].styleClasses}`}
            key={resource}
          >
            <div className="flex w-10 h-10 justify-center py-3">
              {resourcesData[resource].icon}
            </div>
            <span className="font-semibold text-xl">{resourcesData[resource].amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ResourceListContainer.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};
