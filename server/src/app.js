const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/suggestion', require('./routes/suggestion'))
app.use('/profile', require('./routes/profile'))
app.use('/activate', require('./routes/activate'))
/* app.get('/posts', (req, res) => {
   res.send(
    [{
      title: "Hello World",
      description: "Hi there!, How are you?"
    }]
  )
})*/

const server = app.listen(process.env.PORT || 8081)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log('socketid is: ' + socket.id)
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data)
  });
});
