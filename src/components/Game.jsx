import "../css/game.css";
import React, { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import GameContext, { gameReducer, initGameState } from "../GameContext";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";
import BuyCard from "./BuyCard";
import { BankTradeButton } from "./BankTrade";
import DiceRoll from "./DiceRoll";
import EndTurn from "./EndTurn";
import Modal from "./Modal";

function Game() {
  // TODO: gameId must be a number. We could use regex /game/:gameId(//d+)
  const { gameId } = useParams();
  const [game, gameDispatch] = useReducer(gameReducer, initGameState(gameId));
  const [{ disabled, title, body, buttons }, showModal] = useState({
    disabled: true,
    title: "",
    body: "",
    buttons: []
  });
  return (
    <GameContext.Provider value={{ ...game, gameDispatch, showModal }}>
      <div className="game">
        <Board />
        <div className="information">
          <ToastProvider>
            <CardList />
            <BuyCard />
            <ResourceList />
          </ToastProvider>
          <BankTradeButton />
          <DiceRoll />
          <EndTurn />
        </div>
        <Modal
          disabled={disabled}
          title={title}
          body={body}
          buttons={buttons}
        />
      </div>
    </GameContext.Provider>
  );
}

export default Game;
