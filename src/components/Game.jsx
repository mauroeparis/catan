import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../Api";
import Board from "../board/Board";
import CardList from "./CardList";
import ResourceList from "./ResourcesList";

function Game({ match }) {
  const { gameId } = match.params;

  const [resCards, setResCards] = useState([]);
  const [devCards, setDevCards] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.games.cards(gameId);
      const { resources, cards } = res.data;
      setResCards(resources);
      setDevCards(cards);
    };
    fetchRooms();
  }, []);

  return (
    <>
      <CardList cards={devCards} />
      <ResourceList resources={resCards} gameId={gameId}/>
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
