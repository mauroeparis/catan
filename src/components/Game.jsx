import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";
import BuyCard from "./BuyCard";

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
    <>
      <CardList cards={devCards} />
      <ResourceList gameId={id} />
      <BuyCard gameId={id} />
      <Board />
    </>
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
