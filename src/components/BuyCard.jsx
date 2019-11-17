import React, { useState, useEffect, useContext } from "react";

import GameContext from "../GameContext";
import api from "../Api";

export default function BuyCard() {
  const { gameId } = useContext(GameContext);
  const [canBuy, setCanBuy] = useState(false);

  useEffect(() => {
    const fetchActions = async () => {
      const { data: actions } = await api.games.actions(gameId);
      const hasBuyCard = actions.some(a => a.type === "buy_card");
      setCanBuy(hasBuyCard);
    };
    fetchActions();
    const interval = setInterval(() => fetchActions(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  const tryBuy = () => {
    const disabled = false;
    const title = "Buy Card";
    const body =
      "It will cost you 1 grain, 1 ore and 1 wool. Are you sure you want to buy one?";
    const buttons = [
      {
        text: "Accept",
        callback: () => api.games.playAction(gameId, "buy_card", null)
      },
      {
        text: "Cancel"
      }
    ];
    window.showModal({ disabled, title, body, buttons });
  };

  return (
    <div>
      <input
        type="button"
        value="Buy Card"
        disabled={!canBuy}
        onClick={tryBuy}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
