import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../Api";
import GameContext from "../GameContext";
import AuthContext from "../AuthContext";

function WinGame() {
  const { gameId } = useContext(GameContext);
  const [winner, setWinner] = useState(null);
  const { auth } = useContext(AuthContext);

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
    const won = winner === auth.user;
    if (winner) {
      window.showModal({
        disabled: false,
        title: won ? "Victory" : "Defeat",
        body: won ? "You have won!" : `You've been defeated by ${winner}`,
        buttons: [
          {
            text: "Accept",
            callback: () => history.push(`/lobby`)
          }
        ],
        showCloseButton: false
      });
    }
  }, [winner, history, auth.user]);

  return <div />;
}

export default WinGame;
