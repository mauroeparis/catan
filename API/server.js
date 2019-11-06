/*  ---- MOCK API SERVER ---- */

const DELAY = 200; // In miliseconds, how much to wait before giving response
const PORT = 8000;
const SECRET_KEY = "123456789";
const expiresIn = "1h";

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./API/db.json");
const db = JSON.parse(fs.readFileSync("./API/db.json", "UTF-8"));

server.use((req, res, next) => setTimeout(next, DELAY));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ user, pass }) {
  return db.users.findIndex(u => u.user === user && u.pass === pass) !== -1;
}

// Login to one of the users from userdb
server.post("/users/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { user, pass } = req.body;
  if (isAuthenticated({ user, pass }) === false) {
    const status = 401;
    const message = "Incorrect username or password";
    res.status(status).json({ status, message });
    return;
  }
  const token = createToken({ user, pass });
  console.log(`token:${token}`);
  res.status(200).json({ token });
});

// Check token for other actions diff from login and register
server.use(/^(?!\/(login|register)).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.put("/rooms/:id", (req, res) => {
  const status = 200;
  const message = "Lobby joined!";
  res.status(status).json({ status, message });
});

// TODO: this should set curren user as owner after creation.
server.post("/rooms", (req, res, next) => {
  const { name, board_id } = req.body;
  const b = {
    name,
    max_players: 4,
    owner: "test",
    players: ["test"],
    game_has_started: false,
    game_id: board_id
  };
  req.body = b;

  next();
});

// Actions handler for bank_trade
// TODO: Should support other actions.
server.post("/games/:id/player/actions", (req, res, next) => {
  const { type, payload } = req.body;
  if (type === "end_turn") {
    console.log("The user requested to end its turn");
    const status = 200;
    const message = "Turn ended correctly";
    res.status(status).json({ status, message });
    return;
  }
  if (type !== "bank_trade") {
    console.log(`Actions type was ${type}`);
    const status = 400;
    const message = "Error: Actions not yet implemented";
    res.status(status).json({ status, message });
    return;
  }

  const { give, receive } = payload;

  const remove = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) arr.splice(index, 1);
  };

  const r = db.resources;
  r.resources.push(receive);
  remove(r.resources, give);
  remove(r.resources, give);
  remove(r.resources, give);
  remove(r.resources, give);

  req.method = "PUT";
  req.url = "/games/1/player";
  req.body = r;

  next();
});

server.use(
  jsonServer.rewriter({
    "/games/:id/player": "/resources",
    "/games/:id/board": "/hexes",
    "/games/:id/player/actions": "/player_actions"
  })
);

server.use(router);

server.listen(PORT, () => {
  console.log("Run Auth API Server");
});
