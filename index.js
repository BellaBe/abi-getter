const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const { home, notFound, serverError, api } = require('./lib/handlers')

const app = express()

app.disable('x-powered-by')

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000

app.post('/api/contract-abi', api.contractABI)

app.get('/', home)

app.use(notFound)

app.use(serverError)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`)
  })
} else {
  module.exports = app
}
