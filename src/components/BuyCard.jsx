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

  const TextClasses =
    "text-center text-xl self-center tracking-wider text-bold text-white";
  const CommonClasses = "w-5/6 shadow-md rounded h-12";

  return (
    <div>
      <button
        type="button"
        disabled={!canBuy}
        onClick={tryBuy}
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
        Buy Card
      </button>
    </div>
  );
}
