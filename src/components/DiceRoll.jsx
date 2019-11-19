import React, { useState, useEffect, useContext } from "react";

import api from "../Api";
import GameContext from "../GameContext";
import { ReactComponent as DiceOne } from "../public/icons/dice-one-solid.svg";
import { ReactComponent as DiceTwo } from "../public/icons/dice-two-solid.svg";
import { ReactComponent as DiceThree } from "../public/icons/dice-three-solid.svg";
import { ReactComponent as DiceFour } from "../public/icons/dice-four-solid.svg";
import { ReactComponent as DiceFive } from "../public/icons/dice-five-solid.svg";
import { ReactComponent as DiceSix } from "../public/icons/dice-six-solid.svg";

function DiceRoll() {
  const { gameId } = useContext(GameContext);
  const [dices, setDices] = useState(null);
  const diceElements = [
    <DiceOne />,
    <DiceTwo />,
    <DiceThree />,
    <DiceFour />,
    <DiceFive />,
    <DiceSix />
  ];

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
  return (
    <div className="flex flex-row">
      <div className="w-12 mr-4">{diceElements[dices[0] - 1]}</div>
      <div className="w-12">{diceElements[dices[1] - 1]}</div>
    </div>
  );
}

export default DiceRoll;
