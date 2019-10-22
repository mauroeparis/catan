/*  ---- MOCK API SERVER ---- */

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./API/db.json");
const userdb = JSON.parse(fs.readFileSync("./API/db.json", "UTF-8")).users;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const PORT = 8000;

const SECRET_KEY = "123456789";

const expiresIn = "1h";

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
  return userdb.findIndex(u => u.user === user && u.pass === pass) !== -1;
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

server.use(
  jsonServer.rewriter({
    "/games/:id/player": "/resources",
    "/games/:id/board": "/hexes"
  })
);

server.use(router);

server.listen(PORT, () => {
  console.log("Run Auth API Server");
});
