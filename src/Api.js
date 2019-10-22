import axios from "axios";

const URL = "http://localhost:8000/";

const API = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.token}`
  }
});

const POLL_EVERY = 2000;

function login(user, pass) {
  const header = { "Content-Type": "application/json" };
  return API.post("/users/login", { user, pass }, header);
}

const lobbies = {
  all: () => API.get("/rooms"),
  join: id => API.put(`/rooms/${id}`),
  get: id => API.get(`/rooms/${id}`)
};

const games = {
  all: () => API.get("/games/"),
  get: id => API.get(`/games/${id}`),
  board: id => API.get(`/games/${id}/board`),
  player: id => API.get(`/games/${id}/player`),
  actions: id => API.get(`/games/${id}/player/actions`),
  makeAction: (id, type, payload) =>
    API.post(`/games/${id}/player/actions`, { type, payload }),
  transactions: id => API.get(`/games/${id}/player/transactions`)
};

export default {
  POLL_EVERY,
  login,
  lobbies,
  games
};
