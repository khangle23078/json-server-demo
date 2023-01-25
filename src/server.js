const jsonServer = require('json-server')
const auth = require('json-server-auth');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const PORT = 3001;

server.use(middlewares)
server.use(router)
server.use(auth)
server.use(jsonServer.bodyParser)

server.listen(PORT, () => {
   console.log(`JSON Server is running in PORT ${PORT}`)
})