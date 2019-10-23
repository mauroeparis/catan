import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function RollDice({ gameId }) {
  const [dices, setDices] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      const lastDices = [6, 8];
      setDices(lastDices);
      console.log(lastDices);
    };
    fetchActions();
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
