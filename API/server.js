/*  ---- MOCK API SERVER ----
 * Para correrlo usar `npm run mockapi`
 */

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./API/db.json')
const userdb = JSON.parse(fs.readFileSync('./API/db.json', 'UTF-8')).users

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

const PORT = 8000

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Check if the user exists in database
function isAuthenticated({user, pass}){
  return userdb.findIndex(u => u.user === user && u.pass === pass) !== -1
}

// Login to one of the users from userdb
server.post('/users/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {user, pass} = req.body;
  if (isAuthenticated({user, pass}) === false) {
    const status = 401
    const message = 'Incorrect username or password'
    res.status(status).json({status, message})
    return
  }
  const token = createToken({user, pass})
  console.log("token:" + token);
  res.status(200).json({token})
})

server.use(jsonServer.rewriter({
  '/games/:id/player': '/resources',
  '/games/:id/board': '/hexes'
}))

server.use(router)

server.listen(PORT, () => {
  console.log('Run Auth API Server')
})
