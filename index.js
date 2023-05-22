const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const {
  homeHandler,
  abiHandler,
  notFoundHandler,
  serverErrorHandler
} = require('./lib/handlers')
const app = express()

app.disable('x-powered-by')

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', homeHandler)

app.post('/abi', abiHandler)

app.use(notFoundHandler)

app.use(serverErrorHandler)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`)
  })
} else {
  module.exports = app
}
