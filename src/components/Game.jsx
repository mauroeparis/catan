import "../css/game.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";
import BuyCard from "./BuyCard";
import RollDice from "./RollDice";

function Game() {
  const { id } = useParams();
  const [devCards, setDevCards] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      // TODO: Remove cards polling from here, it should be inside CardList
      // like it is made in ResourceList
      const res = await api.games.player(id);
      const { cards } = res.data;
      setDevCards(cards);
    };
    fetchRooms();
  }, [id]);

  return (
    <div className="game">
      <Board gameId={id} />
      <div className="information">
        <CardList cards={devCards} />
        <BuyCard gameId={id} />
        <ResourceList gameId={id} />
        <Link to={`/game/${id}/bankTrade`} className="w-full text-center">
          <input type="button" value="Trade with bank" />
        </Link>
        <RollDice gameId={id} />
      </div>
    </div>
  );
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      gameId: PropTypes.string
    })
  }).isRequired
};

export default Game;
