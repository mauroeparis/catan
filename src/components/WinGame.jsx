import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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

  function wins() {
    const disabled = false;
    const title = "You won the game!";
    const body = "";
    const buttons = [
      {
        text: "Accept",
        callback: () => <Link to="/lobby" />
      }
    ];
    window.showModal({ disabled, title, body, buttons });
  }

  function loses() {
    const disabled = false;
    const title = "You lost the game!";
    const body = "";
    const buttons = [
      {
        text: "Accept",
        callback: () => <Link to="/lobby" />
      }
    ];
    window.showModal({ disabled, title, body, buttons });
  }

  if (winner) {
    if (winner.data.current_turn.user === localStorage.user) {
      wins();
    } else {
      loses();
    }
  } else {
    return null;
  }
}

export default WinGame;
