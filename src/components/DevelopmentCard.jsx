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
import { ReactComponent as KnightIcon } from "../public/icons/knight.svg";
import { ReactComponent as MonopolyIcon } from "../public/icons/monopoly.svg";
import { ReactComponent as YearOfPlentyIcon } from "../public/icons/progress.svg";
import { ReactComponent as VictoryPointIcon } from "../public/icons/trophy.svg";
import { ReactComponent as RoadBuildingIcon } from "../public/icons/worker.svg";

export default function DevelopmentCard({ cardType, amount }) {
  const { phase, gameId, gameDispatch, showModal } = useContext(GameContext);
  const validPhase = [DEFAULT].includes(phase);
  const [canPlayCard, setCanPlayCard] = useState(false);

  const cardIcon = {
    knight: <KnightIcon className="w-10 self-center" />,
    monopoly: <MonopolyIcon className="w-10 self-center" />,
    year_of_plenty: <YearOfPlentyIcon className="w-10 self-center" />,
    victory_point: <VictoryPointIcon className="w-10 self-center" />,
    road_building: <RoadBuildingIcon className="w-10 self-center" />
  };
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
    <li className="bg-gray-800 rounded-lg">
      <button
        type="button"
        className="
          flex
          flex-col
          p-3
          text-center
          text-gray-500
          disabled:cursor-not-allowed
          disabled:opacity-50
          hover:text-gray-200
          rounded-lg"
        onClick={tryPlay}
        disabled={!enabled}
      >
        <div className="flex w-10 h-10 justify-center py-3">
          {cardIcon[cardType]}
        </div>
        <span className="font-semibold text-xl">{amount}</span>
      </button>
    </li>
  );
}

DevelopmentCard.propTypes = {
  cardType: CatanTypes.Card.isRequired,
  amount: PropTypes.number.isRequired
};
