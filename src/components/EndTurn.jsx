import React from "react";
import { useParams } from "react-router-dom";
import api from "../Api";

function EndTurn() {
  const { id } = useParams();

  const FinishTurn = () => {
    const disabled = false;
    const title = "End Turn";
    const body = "Are you sure you want to end your turn?";
    const buttons = [
      {
        text: "Accept",
        callback: () => api.games.playAction(id, "end_turn", null)
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
      className="end-turn"
    />
  );
}

export default EndTurn;
