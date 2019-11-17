import "../css/game.css";
import React, { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import _ from "lodash";

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
  window.setGamePhase = phase => gameDispatch({ type: phase }); // TODO: Remove
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
        {/* TODO: Find a better way to inform the player the current phase */}
        <i style={{ position: "fixed", top: "1rem", right: "1rem" }}>
          {_.startCase(game.phase)}
        </i>
      </div>
    </GameContext.Provider>
  );
}

export default Game;
