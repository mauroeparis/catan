import React from "react";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function CardList({ cards }) {
  let roadBuilding = 0;
  let yearOfPlenty = 0;
  let monopoly = 0;
  let victoryPoint = 0;
  let knight = 0;

  for (let i = 0; i < cards.length; i += 1)
    if (cards[i] === "road_building") {
      roadBuilding += 1;
    } else if (cards[i] === "year_of_plenty") {
      yearOfPlenty += 1;
    } else if (cards[i] === "monopoly") {
      monopoly += 1;
    } else if (cards[i] === "victory_point") {
      victoryPoint += 1;
    } else {
      knight += 1;
    }

  return (
    <div>
      <h1>Road building: {roadBuilding}</h1>
      <h1>Year of plenty: {yearOfPlenty}</h1>
      <h1>Monopoly: {monopoly}</h1>
      <h1>Victory point: {victoryPoint}</h1>
      <h1>Knight: {knight}</h1>
    </div>
  );
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(CatanTypes.Cards).isRequired
};

export default CardList;
