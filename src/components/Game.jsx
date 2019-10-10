import React from "react";
import Board from "../board/Board";
import CardList from "./CardList";
import ResourceList from "./ResourcesList";

function Game() {
  const resources = ["brick", "lumber", "wool", "grain", "ore", "ore", "brick"];
  const cards = ["road_building", "knight", "monopoly", "knight"];
  return (
    <>
      <CardList cards={cards} />
      <ResourceList resources={resources} />
      <Board />
    </>
  );
}

export default Game;
