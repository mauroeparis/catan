import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourcesList";

function Game({ match }) {
  const gameId = match.params.id;

  const [resCards, setResCards] = useState([]);
  const [devCards, setDevCards] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.games.player(gameId);
      const { resources, cards } = res.data;
      setResCards(resources);
      setDevCards(cards);
    };
    fetchRooms();
  }, [gameId]);

  return (
    <>
      <CardList cards={devCards} />
      <ResourceList resources={resCards} />
      <Board />
    </>
  );
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default Game;
