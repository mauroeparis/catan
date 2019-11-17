import { createContext } from "react";

// game action types
export const SET_DEFAULT = "SET_DEFAULT";
export const SET_PLAY_KNIGHT = "SET_PLAY_KNIGHT";

// game phases
export const DEFAULT = "DEFAULT";
export const PLAY_KNIGHT = "PLAY_KNIGHT";
// TODO: EXPECTATING
// TODO: BUILD_TWO_ROADS
// TODO: FINISHED
// TODO: INVALID_GAME_ID

export const initGameState = gameId => ({ phase: DEFAULT, gameId });

const GameContext = createContext();

export function gameReducer(state, action) {
  switch (action.type) {
    case SET_PLAY_KNIGHT:
      return { phase: PLAY_KNIGHT };
    case SET_DEFAULT:
      return { phase: DEFAULT };
    default:
      throw Error(`Invalid action.type === ${action.type} for gameReducer`);
  }
}

export default GameContext;
