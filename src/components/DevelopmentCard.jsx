import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext, { DEFAULT } from "../GameContext";

export default function DevelopmentCard({ cardType, amount }) {
  const { phase, gameId, showModal } = useContext(GameContext);
  const validPhase = [DEFAULT].includes(phase);
  const [canPlayCard, setCanPlayCard] = useState(false);
  const enabled = canPlayCard && validPhase;

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

  const readableType = _.startCase(cardType);

  const tryPlay = () => {
    showModal({
      disabled: false,
      title: `Play ${readableType}`,
      body: "Sorry, but this feature is not yet implemented",
      buttons: [{ text: "Dismiss" }]
    });
  };

  return (
    <li>
      <button type="button" disabled={!enabled} onClick={tryPlay}>
        {readableType}: {amount}
      </button>
    </li>
  );
}

DevelopmentCard.propTypes = {
  cardType: CatanTypes.Card.isRequired,
  amount: PropTypes.number.isRequired
};
