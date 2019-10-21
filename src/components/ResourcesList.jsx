import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../Api";
import CatanTypes from "../CatanTypes";

function ResourcesList({ resources, gameId }) {
  const amounts = _.countBy(resources);
  const [canBuy, setCanBuy] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      const res = await api.games.actions(gameId);
      const actions = res.data;
      const hasBuyCard =
        actions.findIndex(act => act.type === "buy_card") === -1;
      setCanBuy(hasBuyCard);
    };
    fetchActions();
  }, [gameId, setCanBuy]);

  function tryBuy() {
    const t = "Buy Card\nIt will cost 1 ore, 1 wool and 1 grain.";
    if (window.confirm(t)) api.games.makeAction(gameId, "buy_card", null);
  }

  return (
    <div>
      <h1 className="text-3xl">Resource List</h1>
      <h1>Brick: {amounts.brick}</h1>
      <h1>Lumber: {amounts.lumber}</h1>
      <h1>Wool: {amounts.wool}</h1>
      <h1>Grain: {amounts.grain}</h1>
      <h1>Ore: {amounts.ore}</h1>
      <input
        type="button"
        value="Buy Card"
        disabled={canBuy}
        onClick={tryBuy}
      />
    </div>
  );
}

ResourcesList.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired,
  gameId: PropTypes.string.isRequired
};

export default ResourcesList;
