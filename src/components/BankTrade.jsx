import React, { useState, useEffect, useContext } from "react";

import _ from "lodash";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";

import "../css/banktrade.css";
import GameContext from "../GameContext";
import CatanTypes, { RESOURCES } from "../CatanTypes";
import api from "../Api";

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
    const t = `Trading 4 ${offer} for 1 ${request}, are you sure?`;
    if (window.confirm(t)) {
      api.games.playAction(gameId, "bank_trade", {
        give: offer,
        receive: request
      });
      history.push(`/game/${gameId}`);
    }
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
  return (
    <div className="bank-trade">
      <h1>Bank Trading</h1>
      <div className="offer">
        <span>Give 4</span>
        {RESOURCES.map(resource => (
          <button
            key={resource}
            className={`${resource} ${offer === resource ? "selected" : ""}`}
            type="button"
            onClick={() => setOffer(resource)}
            disabled={!canOffer.includes(resource)}
          >
            {_.capitalize(resource)}
          </button>
        ))}
      </div>
      <div className="request">
        <span>Recv 1</span>
        {RESOURCES.map(resource => (
          <button
            key={resource}
            className={`${resource} ${request === resource ? "selected" : ""}`}
            type="button"
            onClick={() => setRequest(resource)}
          >
            {_.capitalize(resource)}
          </button>
        ))}
      </div>
      <div className="footer">
        <Link to={`/game/${gameId}`}>
          <button type="button">Cancel</button>
        </Link>
        <button
          type="button"
          onClick={trade}
          disabled={offer === null || request === null}
        >
          Trade
        </button>
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
  const { gameId } = useContext(GameContext);
  const [canTrade, setCanTrade] = useState(false);

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

  return (
    <Link to={`/game/${gameId}/bankTrade`} className="w-full text-center">
      <input
        type="button"
        value="Trade with bank"
        disabled={!canTrade}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      />
    </Link>
  );
}
