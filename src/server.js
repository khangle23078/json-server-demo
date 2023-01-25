const jsonServer = require('json-server')
const auth = require('json-server-auth');
const cors = require('cors');
const dotenv = require('dotenv')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const app = jsonServer.create();

dotenv.config()

app.db = router.db
server.use(middlewares)
server.use(auth)
server.use(router)
server.use(cors)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
   if (req.method === 'POST') {
      req.body.createAt = new Date.now()
      req.body.updateAt = new Date.now()
   }
   if (req.method === 'PUT') {
      req.body = new Date.now()
   }
   next()
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
   console.log(`JSON Server is running in PORT ${PORT}`)
})