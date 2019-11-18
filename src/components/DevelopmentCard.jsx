import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import CatanTypes from "../CatanTypes";
import api from "../Api";
import GameContext from "../GameContext";
import { ReactComponent as KnightIcon } from "../public/icons/knight.svg";
import { ReactComponent as MonopolyIcon } from "../public/icons/monopoly.svg";
import { ReactComponent as YearOfPlentyIcon } from "../public/icons/progress.svg";
import { ReactComponent as VictoryPointIcon } from "../public/icons/trophy.svg";
import { ReactComponent as RoadBuildingIcon } from "../public/icons/worker.svg";

export default function DevelopmentCard({ cardType, amount }) {
  const { gameId } = useContext(GameContext);
  const [canPlayCard, setCanPlayCard] = useState(false);
  const readableType = _.startCase(cardType);
  const cardIcon = {
    knight: <KnightIcon className="w-10 self-center" />,
    monopoly: <MonopolyIcon className="w-10 self-center" />,
    year_of_plenty: <YearOfPlentyIcon className="w-10 self-center" />,
    victory_point: <VictoryPointIcon className="w-10 self-center" />,
    road_building: <RoadBuildingIcon className="w-10 self-center" />
  };
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
    <li className="bg-gray-800 rounded-lg mx-2">
      <button
        type="button"
        className={`flex flex-col p-3 text-center text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg ${
          canPlayCard
            ? "border-b-4 border-l-4 border-gray-800 hover:border-gray-500"
            : ""
        }`}
        onClick={tryPlay}
        disabled={!canPlayCard}
      >
        <div className="flex w-12 h-12 justify-center py-3">
          {cardIcon[cardType]}
        </div>
        <span>{amount}</span>
      </button>
    </li>
  );
}

DevelopmentCard.propTypes = {
  cardType: CatanTypes.Card.isRequired,
  amount: PropTypes.number.isRequired
};
