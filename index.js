// index.js
// where your node app starts

// init project
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const getClientIP = require('./utils/getClientIP')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/whoami', (request, response) => {
  const ipaddress = getClientIP(request)
  const language = request.headers['accept-language']
  const software = request.headers['user-agent']

  response.status(200).json({
    ipaddress,
    language,
    software
  })
})

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
