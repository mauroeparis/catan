import "../css/game.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";
import BuyCard from "./BuyCard";
import DiceRoll from "./DiceRoll";

function Game() {
  const { id } = useParams();
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
      </div>
    </div>
  );
}

export default Game;
