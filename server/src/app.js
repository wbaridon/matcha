const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World",
      description: "Hi there!, How are you?"
    }]
  )
})
app.listen(process.env.PORT || 8081)
