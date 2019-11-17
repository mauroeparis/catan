import React, { useState, useEffect, useContext } from "react";

import api from "../Api";
import GameContext from "../GameContext";

function DiceRoll() {
  const { gameId } = useContext(GameContext);
  const [dices, setDices] = useState(null);

  useEffect(() => {
    const fetchDices = async () => {
      const res = await api.games.get(gameId);
      const lastDices = res.data.current_turn.dice;
      setDices(lastDices);
    };
    fetchDices();
    const interval = setInterval(() => fetchDices(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  if (!dices) return <i>Loading Dices...</i>;
  return <i>Last dices: {`(${dices[0]} , ${dices[1]})`}</i>;
}

export default DiceRoll;
