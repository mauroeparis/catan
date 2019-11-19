import "../css/game.css";
import React, { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import GameContext, { gameReducer, initGameState } from "../GameContext";
import GameStatus from "./GameStatus";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";
import BuyCard from "./BuyCard";
import { BankTradeButton } from "./BankTrade";
import DiceRoll from "./DiceRoll";
import EndTurn from "./EndTurn";
import Modal from "./Modal";
import WinGame from "./WinGame";

function Game() {
  // TODO: gameId must be a number. We could use regex /game/:gameId(//d+)
  const { gameId } = useParams();
  const [game, gameDispatch] = useReducer(gameReducer, initGameState(gameId));
  const [
    { disabled, title, body, buttons, showCloseButton },
    showModal
  ] = useState({
    disabled: true,
    title: "",
    body: "",
    buttons: [],
    showCloseButton: true
  });
  return (
    <GameContext.Provider value={{ ...game, gameDispatch, showModal }}>
      <div className="game">
        <Board />
        <div className="information">
          <ToastProvider>
            <div className="table">
              <ResourceList />
              <div className="flex flex-col pt-3">
                <BankTradeButton />
                <div className="self-center pt-3">
                  <DiceRoll />
                </div>
              </div>
            </div>
            <div>
              <div className="pb-3">
                <BuyCard />
              </div>
              <CardList />
            </div>
          </ToastProvider>
          <EndTurn />
        </div>
        <GameStatus />
        <Modal
          disabled={disabled}
          title={title}
          body={body}
          buttons={buttons}
          showCloseButton={showCloseButton}
        />
        {/* TODO: WinGame should be managed with GameContext phases instead */}
        <WinGame />
      </div>
    </GameContext.Provider>
  );
}

export default Game;
