import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../Api";

function BuyCard({ gameId }) {
  const [canBuy, setCanBuy] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      const { data: actions } = await api.games.actions(gameId);
      const hasBuyCard = actions.includes("buy_card");
      setCanBuy(hasBuyCard);
    };
    fetchActions();
  }, [gameId]);

  function tryBuy() {
    const t = "Buy Card\nIt will cost 1 ore, 1 wool and 1 grain.";
    if (window.confirm(t)) api.games.makeAction(gameId, "buy_card", null);
  }

  return (
    <div>
      <input
        type="button"
        value="Buy Card"
        disabled={canBuy}
        onClick={tryBuy}
      />
    </div>
  );
}

BuyCard.propTypes = {
  gameId: PropTypes.string.isRequired
};

export default BuyCard;
