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

  return (
    <input
      type="button"
      value="End Turn"
      onClick={FinishTurn}
      disabled={!canEndTurn}
      className="end-turn disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
