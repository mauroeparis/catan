import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../Api";

function CardList({ gameId }) {
  const [cards, setState] = useState(null);
  const amounts = _.countBy(cards);

  useEffect(() => {
    const fetchCards = async () => {
      const player = await api.games.player(gameId);
      setState({ cards: player.data.cards });
    };
    fetchCards();
    const interval = setInterval(() => fetchCards(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [gameId]);

  if (!cards) return <i>Loading Card List...</i>;

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

CardList.propTypes = { gameId: PropTypes.string.isRequired };

export default CardList;
