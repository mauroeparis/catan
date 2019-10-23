import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../Api";

function RollDice({ gameId }) {
  const [dices, setDices] = useState(true);

  useEffect(() => {
    const fetchDices = async () => {
      const lastDices = [6, 8];
      setDices(lastDices);
    };
    fetchDices();
    const interval = setInterval(() => fetchDices(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId, dices]);

  return (
    <div>
      <h1>Last dices: {`(${dices[0]} , ${dices[1]})`}</h1>
    </div>
  );
}

RollDice.propTypes = {
  gameId: PropTypes.string.isRequired
};

export default RollDice;
