import "../css/game.css";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import Board from "./Board";
import CardList from "./CardList";
import { ResourceList } from "./ResourceList";
import BuyCard from "./BuyCard";
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
        <CardList gameId={id} />
        <BuyCard gameId={id} />
        <ResourceList gameId={id} />
        <Link to={`/game/${id}/bankTrade`} className="w-full text-center">
          <input type="button" value="Trade with bank" />
        </Link>
        <DiceRoll gameId={id} />
        <EndTurn />
      </div>
      <Modal disabled={disabled} title={title} body={body} buttons={buttons} />
    </div>
  );
}

export default Game;
