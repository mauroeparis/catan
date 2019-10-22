import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourcesList";
import BuyCard from "./BuyCard";

function Game() {
  const { id } = useParams();

  const [resCards, setResCards] = useState([]);
  const [devCards, setDevCards] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.games.cards(id);
      const { resources, cards } = res.data;
      setResCards(resources);
      setDevCards(cards);
    };
    fetchRooms();
  }, [id]);

  return (
    <>
      <CardList cards={devCards} />
      <ResourceList resources={resCards} gameId={id} />
      <BuyCard gameId={id} />
      <Board gameId={id} />
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
