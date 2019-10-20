import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import axios from "axios";
import CatanTypes from "../CatanTypes";

import API from "../Api";

// TODO
// agregar arrays al estado
// agregar estado a todo
// ver como modificar los recursos, que llamadas hay que hacer

function BankTradeComp({ resources }) {
  const amounts = _.countBy(resources);
  const availableButtons = _.pickBy(amounts, x => x >= 4);
  const refreshButtons = _.keys(availableButtons);

  // TODO : Should use state to re-render enabled buttons
  const [state, setState] = useState();

// This is part of Api.js
  const games = {
    all: () => API.get("/games/"),
    get: id => API.get(`/games/${id}`),
    board: id => API.get(`/games/${id}/board`),
    player: id => API.get(`/games/${id}/player`),
    actions: id => API.get(`/games/${id}/player/actions`),
    makeAction: (id, action, payload) =>
      API.post(`/games/${id}/player/actions`, { action, payload }),
    transactions: id => API.get(`/games/${id}/player/transactions`)
  };

  let giveResource;
  let receiveResource;

  let buttonTable = {
    brick: true,
    lumber: true,
    wool: true,
    grain: true,
    ore: true
  };

  function setGiveResource(res) {
    giveResource = res;
  }

  function setReceiveResource(res) {
    receiveResource = res;
  }

  function EnableClickableButtons(manyResources, table) {
    const newTable = table;
    manyResources.forEach(res => (newTable[res] = false));
    return newTable;
  }

  const newButtonTable = EnableClickableButtons(refreshButtons, buttonTable);

  function TradeResources(give, receive) {
    const gameId = 1; // TODO: Should come from an upper state
    const t = "You are going to exchange 4 of your resource for 1 selected from the bank.";
    if (window.confirm(t)) {
      games.makeAction(gameId, "trade_bank", { give, receive });
      console.log(give);
      console.log(receive);
    }
  }

  function FlushSelectedResources() {
    giveResource = undefined;
    receiveResource = undefined;
    buttonTable = {
      brick: true,
      lumber: true,
      wool: true,
      grain: true,
      ore: true
    };
  }

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setGiveResource("brick")}
          disabled={newButtonTable.brick}
        >
          Give Brick
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("lumber")}
          disabled={newButtonTable.lumber}
        >
          Give Lumber
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("wool")}
          disabled={newButtonTable.wool}
        >
          Give Wool
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("Grain")}
          disabled={newButtonTable.grain}>
          Give Grain
        </button>
        <button
          type="button"
          onClick={() => setGiveResource("Ore")}
          disabled={newButtonTable.ore}>
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
        <button type="button" onClick={() => setReceiveResource("Grain")}>
          Receive Grain
        </button>
        <button type="button" onClick={() => setReceiveResource("Ore")}>
          Receive Ore
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => TradeResources(giveResource, receiveResource)}
        >
          Accept
        </button>
        <button type="button" onClick={FlushSelectedResources}>
          Cancel
        </button>
      </div>
    </div>
  );
}

BankTradeComp.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default BankTradeComp;
