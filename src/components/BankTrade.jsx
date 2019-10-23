import React, { useState } from "react";
import "../css/banktrade.css";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";

import CatanTypes from "../CatanTypes";
import API from "../Api";

function BankTrade({ resources }) {
  const { gameId } = useParams();
  const history = useHistory();

  const amounts = _.countBy(resources);
  const availableButtons = _.pickBy(amounts, x => x >= 4);
  const refreshButtons = _.keys(availableButtons);

  const [{ giveResource, receiveResource }, setState] = useState({
    giveResource: null,
    receiveResource: null
  });

  function tradeResources() {
    const t = `Trading 4 ${giveResource} for 1 ${receiveResource}, are you sure?`;
    if (window.confirm(t)) {
      API.games.playAction(gameId, "bank_trade", {
        give: giveResource,
        receive: receiveResource
      });
      history.push(`/game/${gameId}`);
    }
  }

  const setGiveResource = res =>
    setState({ giveResource: res, receiveResource });

  const setReceiveResource = res =>
    setState({ giveResource, receiveResource: res });

  const RESOURCES = ["brick", "lumber", "wool", "grain", "ore"];

  return (
    <div className="bank-trade">
      <h1>Bank Trading</h1>
      <div className="giving">
        <span>Give 4</span>
        {RESOURCES.map(resource => (
          <button
            key={resource}
            className={`${resource} ${
              giveResource === resource ? "selected" : ""
            }`}
            type="button"
            onClick={() => setGiveResource(resource)}
            disabled={!refreshButtons.includes(resource)}
          >
            {resource[0].toUpperCase() + resource.substring(1)}
          </button>
        ))}
      </div>
      <div className="receiving">
        <span>Recv 1</span>
        {RESOURCES.map(resource => (
          <button
            key={resource}
            className={`${resource} ${
              receiveResource === resource ? "selected" : ""
            }`}
            type="button"
            onClick={() => setReceiveResource(resource)}
          >
            {resource[0].toUpperCase() + resource.substring(1)}
          </button>
        ))}
      </div>
      <div className="footer">
        <Link to={`/game/${gameId}`}>
          <button
            type="button"
            onClick={() =>
              setState({ giveResource: null, receiveResource: null })
            }
          >
            Cancel
          </button>
        </Link>
        <button
          type="button"
          onClick={() => tradeResources(giveResource, receiveResource)}
          disabled={giveResource === null || receiveResource === null}
        >
          Trade
        </button>
      </div>
    </div>
  );
}

BankTrade.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default BankTrade;
