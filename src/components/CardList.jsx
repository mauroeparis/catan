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
    <div>
      <h1 className="text-3xl">Card List</h1>
      <h1>Road building: {amounts.road_building}</h1>
      <h1>Year of plenty: {amounts.year_of_plenty}</h1>
      <h1>Monopoly: {amounts.monopoly}</h1>
      <h1>Victory point: {amounts.victory_point}</h1>
      <h1>Knight: {amounts.knight}</h1>
    </div>
  );
}

CardList.propTypes = { gameId: PropTypes.string.isRequired };

export default CardList;
