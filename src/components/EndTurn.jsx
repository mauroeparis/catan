import React, { useState, useEffect, useContext } from "react";

import api from "../Api";
import GameContext from "../GameContext";

export default function EndTurn() {
  const { gameId } = useContext(GameContext);
  const [canEndTurn, setCanEndTurn] = useState(false);

  useEffect(() => {
    const fetchActions = async () => {
      const { data: actions } = await api.games.actions(gameId);
      const endTurnAvailable = actions.some(a => a.type === "end_turn");
      setCanEndTurn(endTurnAvailable);
    };
    fetchActions();
    const interval = setInterval(() => fetchActions(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  const FinishTurn = () => {
    const disabled = false;
    const title = "End Turn";
    const body = "Are you sure you want to end your turn?";
    const buttons = [
      {
        text: "Accept",
        callback: () => api.games.playAction(gameId, "end_turn", null)
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
    <button
      type="button"
      disabled={!canEndTurn}
      onClick={FinishTurn}
      className={`
        h-16
        w-full
        bg-red-800
        hover:bg-red-900
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${CommonClasses}
        ${TextClasses}
      `}
    >
      End Turn
    </button>
  );
}

//     <input
    //   type="button"
    //   value="End Turn"
    //   className="end-turn disabled:cursor-not-allowed disabled:opacity-50"
    // />
