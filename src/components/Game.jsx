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
  const { id } = useParams();
  const [{ disabled, title, body, buttons }, setModal] = useState({
    disabled: true,
    title: "",
    body: "",
    buttons: []
  });
  window.showModal = setModal;
  return (
    <div className="game">
      <Board gameId={id} />
      <div className="information">
        <ToastProvider>
          <CardList gameId={id} />
          <BuyCard gameId={id} />
          <ResourceList gameId={id} />
        </ToastProvider>
        <BankTradeButton gameId={id} />
        <DiceRoll gameId={id} />
        <EndTurn />
      </div>
      <Modal disabled={disabled} title={title} body={body} buttons={buttons} />
    </div>
  );
}

export default Game;
