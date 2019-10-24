import axios from "axios";

const URL = "http://localhost:8000/";

const API = axios.create({
  baseURL: URL,
  timeout: 10000,
});
if (localStorage.token) {
  const token = localStorage.token;
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  API.defaults.headers.Authorization = `Token ${token}`;
}

const POLL_EVERY = 2000;

const auth = {
  login: (user, pass) => API.post("/users/login/", { username: user, password: pass }),
  register: (user, pass) => API.post("/users/", { username: user, password: pass })
};

const boards = {
  all: () => API.get("/boards")
};

const lobbies = {
  all: () => API.get("/rooms"),
  create: (name, boardId) => API.post("/rooms/", { name, boardId }),
  join: id => API.put(`/rooms/${id}`),
  get: id => API.get(`/rooms/${id}`)
};

const games = {
  all: () => API.get("/games/"),
  get: id => API.get(`/games/${id}`),
  board: id => API.get(`/games/${id}/board`),
  player: id => API.get(`/games/${id}/player`),
  actions: id => API.get(`/games/${id}/player/actions`),
  playAction: (id, type, payload) =>
    API.post(`/games/${id}/player/actions`, { type, payload }),
  transactions: id => API.get(`/games/${id}/player/transactions`)
};

export default {
  POLL_EVERY,
  API,
  auth,
  boards,
  lobbies,
  games
};
