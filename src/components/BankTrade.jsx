import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import CatanTypes from "../CatanTypes";

import API from "../Api";

function BankTradeComp({ resources }) {
  const { gameId } = useParams();

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
      API.games.makeAction(gameId, "trade_bank", {
        give: giveResource,
        receive: receiveResource
      });
    }
  }

  const setGiveResource = res =>
    setState({ giveResource: res, receiveResource });

  const setReceiveResource = res =>
    setState({ giveResource, receiveResource: res });

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setGiveResource("brick")}
          disabled={!refreshButtons.includes("brick")}
        >
          Give Brick
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("lumber")}
          disabled={!refreshButtons.includes("lumber")}
        >
          Give Lumber
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("wool")}
          disabled={!refreshButtons.includes("wool")}
        >
          Give Wool
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("grain")}
          disabled={!refreshButtons.includes("grain")}
        >
          Give Grain
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("ore")}
          disabled={!refreshButtons.includes("ore")}
        >
          Give Ore
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setReceiveResource("brick")}>
          Receive Brick
        </button>
        <button type="button" onClick={() => setReceiveResource("lumber")}>
          Receive Lumber
        </button>
        <button type="button" onClick={() => setReceiveResource("wool")}>
          Receive Wool
        </button>
        <button type="button" onClick={() => setReceiveResource("grain")}>
          Receive Grain
        </button>
        <button type="button" onClick={() => setReceiveResource("ore")}>
          Receive Ore
        </button>
      </div>
      <div>
        <Link to={`/games/${gameId}`}>
          <button
            type="button"
            onClick={() => tradeResources(giveResource, receiveResource)}
          >
            Accept
          </button>
        </Link>
        <Link to={`/games/${gameId}`}>
          <button
            type="button"
            onClick={() =>
              setState({ giveResource: null, receiveResource: null })
            }
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
}

BankTradeComp.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired,
  gameId: PropTypes.number.isRequired
};

export default BankTradeComp;
