import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { DEV_CARDS } from "../CatanTypes";
import DevelopmentCard from "./DevelopmentCard";
import api from "../Api";

function CardList({ gameId }) {
  const [{ cards }, setState] = useState({ cards: null });
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
        {DEV_CARDS.map(cardType => (
          <DevelopmentCard
            key={cardType}
            cardType={cardType}
            amount={amounts[cardType] || 0}
            gameId={gameId}
          />
        ))}
      </ul>
    </div>
  );
}

CardList.propTypes = { gameId: PropTypes.string.isRequired };

export default CardList;
