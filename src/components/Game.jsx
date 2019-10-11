import React, { useState, useEffect } from "react";

import api from "../Api";
import Board from "../board/Board";
import CardList from "./CardList";
import ResourceList from "./ResourcesList";

function Game(props) {
  const { match } = props;
  const gameId = match.params.id;

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
      <ResourceList resources={resCards} />
      <Board />
    </>
  );
}

export default Game;
