import axios from "axios";

const URL = "http://localhost:8000/";

const API = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.token}`
  }
});

function login(user, pass) {
  const header = { "Content-Type": "application/json" };
  return API.post("/users/login", { user, pass }, header);
}

const lobby = {
  list: API.get("/rooms")
};

const games = {
  board: id => API.get(`/games/${id}`),
  cards: id => API.get(`/games/${id}/player`)
};

export default {
  login,
  lobby,
  games
};
