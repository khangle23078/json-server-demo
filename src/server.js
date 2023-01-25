const jsonServer = require('json-server')
const auth = require('json-server-auth');
const cors = require('cors');
const dotenv = require('dotenv')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
dotenv.config()

server.use(middlewares)
server.use(router)
server.use(auth)
server.use(cors)
server.use(jsonServer.bodyParser)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
   console.log(`JSON Server is running in PORT ${PORT}`)
})