import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../Api";
import GameContext from "../GameContext";

function WinGame() {
  const { gameId } = useContext(GameContext);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchWinner = async () => {
      const res = await api.games.get(gameId);
      const lastWinner = res.data.winner;
      setWinner(lastWinner);
    };
    fetchWinner();
    const interval = setInterval(() => fetchWinner(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  const history = useHistory();

  useEffect(() => {
    if (winner) {
      window.showModal({
        closeModal: false,
        disabled: false,
        title: winner === localStorage.user ? "You have won" : "You have lost",
        body: "",
        buttons: [
          {
            text: "Accept",
            callback: () => history.push(`/lobby`)
          }
        ]
      });
    }
  }, [winner, history]);

  return <div />;
}

export default WinGame;
