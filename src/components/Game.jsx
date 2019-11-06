import "../css/game.css";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Board from "./Board";
import CardList from "./CardList";
import { ResourceList } from "./ResourceList";
import BuyCard from "./BuyCard";
import DiceRoll from "./DiceRoll";
import EndTurn from "./EndTurn";

function Game() {
  const { id } = useParams();
  return (
    <div className="game">
      <Board gameId={id} />
      <div className="information">
        <ToastProvider>
          <CardList gameId={id} />
          <BuyCard gameId={id} />
          <ResourceList gameId={id} />
        </ToastProvider>
        <Link to={`/game/${id}/bankTrade`} className="w-full text-center">
          <input type="button" value="Trade with bank" />
        </Link>
        <DiceRoll gameId={id} />
        <EndTurn />
      </div>
    </div>
  );
}

export default Game;
