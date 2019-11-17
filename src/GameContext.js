import { createContext } from "react";

// game action types
export const SET_DEFAULT = "SET_DEFAULT";
export const SET_MOVE_ROBBER = "SET_MOVE_ROBBER";

// game phases
export const DEFAULT = "DEFAULT";
export const MOVE_ROBBER = "MOVE_ROBBER";
// TODO: EXPECTATING
// TODO: BUILD_TWO_ROADS
// TODO: FINISHED
// TODO: INVALID_GAME_ID

export const initGameState = gameId => ({ phase: DEFAULT, gameId });

const GameContext = createContext();

export function gameReducer(state, action) {
  switch (action.type) {
    case SET_MOVE_ROBBER:
      return { phase: DEFAULT };
    case SET_DEFAULT:
      return { phase: MOVE_ROBBER };
    default:
      throw Error(`Invalid action.type === ${action.type} for gameReducer`);
  }
}

export default GameContext;
