import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function CardList({ cards }) {
  const amounts = _.countBy(cards);

  return (
    <div className="card-list">
      <h1>Card List</h1>
      <ul>
        <li>Road building: {amounts.road_building}</li>
        <li>Year of plenty: {amounts.year_of_plenty}</li>
        <li>Monopoly: {amounts.monopoly}</li>
        <li>Victory point: {amounts.victory_point}</li>
        <li>Knight: {amounts.knight}</li>
      </ul>
    </div>
  );
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(CatanTypes.Card).isRequired
};

export default CardList;
