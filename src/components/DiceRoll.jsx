import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../Api";

function DiceRoll({ gameId }) {
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

DiceRoll.propTypes = {
  gameId: PropTypes.string.isRequired
};

export default DiceRoll;
