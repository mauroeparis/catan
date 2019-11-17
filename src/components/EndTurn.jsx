import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Api";

function EndTurn() {
  const { id: gameId } = useParams(); // TODO: Should come from a GameContext
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

export default EndTurn;
