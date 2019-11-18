import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext, {
  DEFAULT,
  SET_PLAY_KNIGHT,
  SET_PLAY_ROAD_BUILDING
} from "../GameContext";

export default function DevelopmentCard({ cardType, amount }) {
  const { phase, gameId, gameDispatch, showModal } = useContext(GameContext);
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
    let body;
    let callback;
    switch (cardType) {
      case "knight":
        body = "Select where you want to move the robber.";
        callback = () => gameDispatch({ type: SET_PLAY_KNIGHT });
        break;
      case "road_building":
        body = "Select up to two roads to build roads on.";
        callback = () => gameDispatch({ type: SET_PLAY_ROAD_BUILDING });
        break;
      default:
        body = "Sorry, this feature is not yet implemented";
        callback = () => {};
    }
    showModal({
      disabled: false,
      title: `Play ${readableType}`,
      body,
      buttons: [{ text: "Ok", callback }]
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
