import "../css/game.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Board from "./Board";
import CardList from "./CardList";
import { ResourceList } from "./ResourceList";
import BuyCard from "./BuyCard";
import { BankTradeButton } from "./BankTrade";
import DiceRoll from "./DiceRoll";
import EndTurn from "./EndTurn";
import Modal from "./Modal";

function Game() {
  const { gameId } = useParams();
  const [{ disabled, title, body, buttons }, setModal] = useState({
    disabled: true,
    title: "",
    body: "",
    buttons: []
  });
  window.showModal = setModal;
  return (
    <div className="game">
      <Board gameId={gameId} />
      <div className="information">
        <ToastProvider>
          <CardList gameId={gameId} />
          <BuyCard gameId={gameId} />
          <ResourceList gameId={gameId} />
        </ToastProvider>
        <BankTradeButton gameId={gameId} />
        <DiceRoll gameId={gameId} />
        <EndTurn />
      </div>
      <Modal disabled={disabled} title={title} body={body} buttons={buttons} />
    </div>
  );
}

export default Game;
