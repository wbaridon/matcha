const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'test'}))
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
