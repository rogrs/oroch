const express = require('express')
const upload = require('./upload')
const cors = require('cors')
const port = process.env.PORT || 8000;
const server = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload)

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`)

})