import jsonServer from 'json-server'
import cors from 'cors'
import dotenv from 'dotenv'
import queryString from 'query-string'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
dotenv.config()

server.use(middlewares)
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

router.render = (req, res) => {
   const headers = res.getHeaders()
   const totalCountHeader = headers['x-total-count'];
   if (req.method === 'GET' || totalCountHeader) {
      const params = req._parsedUrl.query;
      console.log(params);
      const queryParams = queryString.parse(params);
      console.log(queryParams);
      const results = {
         data: res.locals.data,
         paginate: {
            _page: Number.parseInt(queryParams._page) || 1,
            _limit: Number.parseInt(queryParams._limit) || 10,
            _totalRows: Number.parseInt(totalCountHeader)
         }
      }

      return res.jsonp(results)
   }

   res.jsonp(res.locals.data)
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
   console.log(`JSON Server is running in PORT ${PORT}`)
})