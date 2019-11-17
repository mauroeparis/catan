import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext from "../GameContext";

// TODO: gameId should come from a GameContext,
// there are other components with same problem as well
export default function DevelopmentCard({ cardType, amount }) {
  const { gameId } = useContext(GameContext);
  const [canPlayCard, setCanPlayCard] = useState(false);
  const readableType = _.startCase(cardType);
  useEffect(() => {
    const fetchActions = async () => {
      const { data: actions } = await api.games.actions(gameId);
      const playable = actions.some(a => a.type === `play_${cardType}_card`);
      setCanPlayCard(playable);
    };
    fetchActions();
    const interval = setInterval(() => fetchActions(), api.POLL_EVERY);
    return () => clearInterval(interval);
  }, [cardType, gameId]);

  const tryPlay = () => {
    window.showModal({
      disabled: false,
      title: `Play ${readableType}`,
      body: "Sorry, but this feature is not yet implemented",
      buttons: [{ text: "Dismiss" }]
    });
  };

  return (
    <li>
      <button type="button" disabled={!canPlayCard} onClick={tryPlay}>
        {readableType}: {amount}
      </button>
    </li>
  );
}

DevelopmentCard.propTypes = {
  cardType: CatanTypes.Card.isRequired,
  amount: PropTypes.number.isRequired
};
