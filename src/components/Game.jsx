import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../Api";
import Board from "./Board";
import CardList from "./CardList";
import ResourceList from "./ResourceList";

function Game({ match }) {
  const { gameId } = match.params;
  const [devCards, setDevCards] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      // TODO: Remove cards polling from here, it should be inside CardList
      // like it is made in ResourceList
      const res = await api.games.player(gameId);
      const { cards } = res.data;
      setDevCards(cards);
    };
    fetchRooms();
  }, [gameId]);

  return (
    <>
      <CardList cards={devCards} />
      <ResourceList gameId={gameId} />
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
