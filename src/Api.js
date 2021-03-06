import axios from "axios";

const URL = process.env.REACT_APP_API;

const POLL_EVERY = 2000;

const API = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${localStorage.token}`;
      }
    }
  }
});

const auth = {
  login: (user, pass) => API.post("/users/login/", { user, pass }),
  register: (user, pass) => API.post("/users/", { user, pass })
};

const boards = {
  all: () => API.get("/boards/")
};

const lobbies = {
  all: () => API.get("/rooms/"),
  create: (name, board_id) => API.post("/rooms/", { name, board_id }),
  join: id => API.put(`/rooms/${id}/`),
  get: id => API.get(`/rooms/${id}/`),
  start: id => API.patch(`/rooms/${id}/`),
  cancel: id => API.delete(`/rooms/${id}/`)
};

const games = {
  all: () => API.get("/games/"),
  get: id => API.get(`/games/${id}/`),
  board: id => API.get(`/games/${id}/board/`),
  player: id => API.get(`/games/${id}/player/`),
  actions: id => API.get(`/games/${id}/player/actions/`),
  playAction: (id, type, payload) =>
    API.post(`/games/${id}/player/actions/`, { type, payload }),
  transactions: id => API.get(`/games/${id}/player/transactions/`)
};

// Decorator for temporarily memoizing apicalls
function memoize(apicall) {
  function memcall(...args) {
    const key = JSON.stringify(args);
    const now = Date.now();
    if (!memcall.cache) memcall.cache = {};
    if (key in memcall.cache && now < memcall.cache[key].time + POLL_EVERY)
      return memcall.cache[key].value;
    const res = apicall(...args);
    memcall.cache[key] = { time: now, value: res };
    return res;
  }
  return memcall;
}

const endpoints = { auth, boards, lobbies, games };

// Memoize endpoints
for (const [i, group] of Object.entries(endpoints))
  for (const [j, apicall] of Object.entries(group))
    endpoints[i][j] = memoize(apicall);

export default {
  POLL_EVERY,
  ...endpoints
};
