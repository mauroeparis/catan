import React, { useState, useEffect, useContext } from "react";

import _ from "lodash";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";

import "../css/banktrade.css";
import GameContext, { DEFAULT } from "../GameContext";
import CatanTypes, { RESOURCES } from "../CatanTypes";
import api from "../Api";
import { ReactComponent as BrickIcon } from "../public/icons/brick.svg";
import { ReactComponent as WoolIcon } from "../public/icons/sheep.svg";
import { ReactComponent as OreIcon } from "../public/icons/stone.svg";
import { ReactComponent as LumberIcon } from "../public/icons/trees.svg";
import { ReactComponent as GrainIcon } from "../public/icons/wheat.svg";

export default function BankTrade() {
  const [{ resources }, setResources] = useState({ resources: null });
  const [{ offer, request }, setTradeState] = useState({
    offer: null,
    request: null
  });

  // TODO: gameId can't come frome GameContext since BankTrade is another view
  // that is not inside <Game />
  const { gameId } = useParams();
  const history = useHistory();

  // Resources the player can offer for a bank trade (i.e. has more than 4)
  const canOffer = _.keys(_.pickBy(_.countBy(resources), a => a >= 4));

  useEffect(() => {
    const fetchResources = async () => {
      const player = await api.games.player(gameId);
      setResources({ resources: player.data.resources });
    };
    fetchResources();
    const interval = setInterval(() => fetchResources(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  function trade() {
    // callback that is called from the container, it uses its current scope
    // for knowing offer and request variables
    api.games.playAction(gameId, "bank_trade", {
      give: offer,
      receive: request
    });
    history.push(`/game/${gameId}`);
  }

  if (!resources) return <i>Determining Trade Options...</i>;
  return (
    <BankTradeContainer
      offer={offer}
      request={request}
      canOffer={canOffer}
      gameId={gameId}
      setTradeState={setTradeState}
      trade={trade}
    />
  );
}

// TODO: We are missusing the term container.
// In redux jargon component is used to refer to presentational components
// and container for logic components that contains those components
// we are using the term container as the exact opposite of what it is
// and we are not even using redux :)
function BankTradeContainer({
  offer = null,
  request = null,
  canOffer,
  gameId,
  setTradeState,
  trade
}) {
  const setOffer = resource => setTradeState({ offer: resource, request });
  const setRequest = resource => setTradeState({ offer, request: resource });

  const resourcesData = {
    brick: {
      icon: <BrickIcon className="w-16 h-8 p-1" />,
      styleClasses: "bg-red-800 text-orange-500 border-2",
      hoverClasses: "hover:bg-red-700 hover:border-orange-500",
      focusClasses: "bg-red-700 border-orange-500"
    },
    lumber: {
      icon: <LumberIcon className="w-16 h-8 p-1" />,
      styleClasses: "bg-green-900 text-green-500 border-2",
      hoverClasses: "hover:bg-green-800 hover:border-green-500",
      focusClasses: "bg-green-800 border-green-500"
    },
    grain: {
      icon: <GrainIcon className="w-16 h-8 p-1" />,
      styleClasses: "bg-yellow-500 text-yellow-900 border-2",
      hoverClasses: "hover:bg-yellow-400 hover:border-yellow-900",
      focusClasses: "bg-yellow-400 border-yellow-900"
    },
    ore: {
      icon: <OreIcon className="w-16 h-8 p-1" />,
      styleClasses: "bg-gray-700 text-gray-500 border-2",
      hoverClasses: "hover:bg-gray-600 hover:border-gray-500",
      focusClasses: "bg-gray-600 border-gray-900"
    },
    wool: {
      icon: <WoolIcon className="w-16 h-8 p-1" />,
      styleClasses: "bg-green-500 text-green-900 border-2",
      hoverClasses: "hover:bg-green-400 hover:border-green-900",
      focusClasses: "bg-green-400 border-green-900"
    }
  };

  const commonBtnClasses = resource => {
    return `mx-3 py-2 rounded-lg ${resourcesData[resource].styleClasses} disabled:cursor-not-allowed`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col bg-gray-200 w-1/2 text-center rounded-lg text-gray-900 p-4 mt-40">
        <h1 className="text-4xl font-cinzel w-full pb-6">Bank Trading</h1>
        <div className="flex flex-col pb-3">
          <span className="text-bold text-lg">Give 4</span>
          <div>
            {RESOURCES.map(resource => (
              <button
                key={resource}
                className={`text-center ${commonBtnClasses(resource)} ${
                  canOffer.includes(resource)
                    ? resourcesData[resource].hoverClasses
                    : "opacity-50"
                } ${
                  offer === resource ? resourcesData[resource].focusClasses : ""
                }`}
                type="button"
                onClick={() => setOffer(resource)}
                disabled={!canOffer.includes(resource)}
              >
                {resourcesData[resource].icon}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col pb-6">
          <span className="text-bold text-lg">Recive 1</span>
          <div>
            {RESOURCES.map(resource => (
              <button
                key={resource}
                className={`${commonBtnClasses(resource)}
                ${resourcesData[resource].hoverClasses} ${
                  request === resource
                    ? resourcesData[resource].focusClasses
                    : ""
                }`}
                type="button"
                onClick={() => setRequest(resource)}
              >
                {resourcesData[resource].icon}
              </button>
            ))}
          </div>
        </div>
        <div className="flex self-center justify-around w-1/2">
          <Link to={`/game/${gameId}`}>
            <button
              type="button"
              className="px-4 bg-transparent p-3 rounded-lg text-blue-800 bg-gray-300 hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
          </Link>
          <button
            type="button"
            onClick={trade}
            disabled={offer === null || request === null}
            className="px-4 bg-transparent p-3 rounded-lg bg-blue-800 text-gray-100 hover:bg-blue-900 hover:text-blue-200 mr-2"
          >
            Trade
          </button>
        </div>
      </div>
    </div>
  );
}

BankTradeContainer.propTypes = {
  offer: CatanTypes.Resource,
  request: CatanTypes.Resource,
  canOffer: PropTypes.arrayOf(CatanTypes.Resource).isRequired,
  gameId: PropTypes.string.isRequired,
  setTradeState: PropTypes.func.isRequired,
  trade: PropTypes.func.isRequired
};

// TODO: Eventually defaultProps will be deprecated, but for now eslint
// has not been updated to use es6 default parameters instead
// https://github.com/yannickcr/eslint-plugin-react/issues/666
// when it happens, move this and other occurrences as default parameters
BankTradeContainer.defaultProps = {
  offer: null,
  request: null
};

export function BankTradeButton() {
  const { phase, gameId } = useContext(GameContext);
  const validPhase = [DEFAULT].includes(phase);
  const [canTrade, setCanTrade] = useState(false);
  const enabled = canTrade && validPhase;

  useEffect(() => {
    const fetchActions = async () => {
      const { data: actions } = await api.games.actions(gameId);
      const bankTradeAvailable = actions.some(a => a.type === "bank_trade");
      setCanTrade(bankTradeAvailable);
    };
    fetchActions();
    const interval = setInterval(() => fetchActions(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  const TextClasses = `
    text-center
    text-xl
    self-center
    tracking-wider
    text-bold
    text-white
    font-cinzel
  `;
  const CommonClasses = "w-5/6 shadow-md rounded h-12";

  return (
    <Link to={`/game/${gameId}/bankTrade`} className="w-full text-center">
      <button
        type="button"
        disabled={!enabled}
        className={`
          h-16
          bg-blue-800
          w-full
          hover:bg-blue-900
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${CommonClasses}
          ${TextClasses}
        `}
      >
        Trade with bank
      </button>
    </Link>
  );
}
