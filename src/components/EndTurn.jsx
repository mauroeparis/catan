import React from "react";
import { useParams } from "react-router-dom";
import api from "../Api";

function EndTurn() {
  const { id } = useParams();

  function FinishTurn() {
    const t = "Would you like to finish your turn?";
    if (window.confirm(t)) {
      api.games.playAction(id, "end_turn", null);
    }
  }

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
