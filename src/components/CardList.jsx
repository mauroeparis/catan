import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function CardList({ cards }) {
  const amounts = _.countBy(cards);

  return (
    <div>
      <h1>Road building: {amounts.road_building}</h1>
      <h1>Year of plenty: {amounts.year_of_plenty}</h1>
      <h1>Monopoly: {amounts.monopoly}</h1>
      <h1>Victory point: {amounts.victory_point}</h1>
      <h1>Knight: {amounts.knight}</h1>
    </div>
  );
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(CatanTypes.Card).isRequired
};

export default CardList;
