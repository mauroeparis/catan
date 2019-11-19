import { createContext } from "react";

// game action types
export const SET_DEFAULT = "SET_DEFAULT";
export const SET_PLAY_KNIGHT = "SET_PLAY_KNIGHT";
export const SET_PLAY_ROAD_BUILDING = "SET_PLAY_ROAD_BUILDING";
export const SET_MOVE_ROBBER = "SET_MOVE_ROBBER";

// game phases
export const DEFAULT = "DEFAULT";
export const PLAY_KNIGHT = "PLAY_KNIGHT";
export const PLAY_ROAD_BUILDING = "PLAY_ROAD_BUILDING";
export const ADD_ROAD_PLAY_ROAD_BUILDING = "ADD_ROAD_PLAY_ROAD_BUILDING";
export const MOVE_ROBBER = "MOVE_ROBBER";
// TODO: EXPECTATING
// TODO: FINISHED
// TODO: INVALID_GAME_ID

export const initGameState = gameId => ({ phase: DEFAULT, gameId });

const GameContext = createContext();

export function gameReducer(state, action) {
  switch (action.type) {
    case SET_DEFAULT:
      return { ...state, phase: DEFAULT };
    case SET_PLAY_KNIGHT:
      return { ...state, phase: PLAY_KNIGHT };
    case SET_PLAY_ROAD_BUILDING:
      return { ...state, phase: PLAY_ROAD_BUILDING, roads: [] };
    case ADD_ROAD_PLAY_ROAD_BUILDING: {
      // Assumes state.roads and action.road exists and are CatanTypes.Road
      let roads;
      if (state.roads.length < 2) {
        roads = state.roads.concat([action.road]);
      } else {
        // enqueue new road as fifo
        roads = [...state.roads];
        roads.push(action.road);
        roads.shift();
      }
      return { ...state, roads };
    }
    case SET_MOVE_ROBBER:
      return { ...state, phase: MOVE_ROBBER };
    default:
      throw Error(`Invalid action.type === ${action.type} for gameReducer`);
  }
}

export default GameContext;
