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
app.use('/reset', require('./routes/resetPassword'))
app.use('/search', require('./routes/search'))
 app.get('/', (req, res) => {
   res.send('The server is working...'
 )
})

const server = app.listen(process.env.PORT || 8081)

const io = require('socket.io')(server, {
 pingInterval: 1000,
 pingTimeout: 5000,
})
const chat = require('./models/chat.js')
// Active user sessions will be stored here
var userSockets = []

function getUsername(token, callback) {
  const jwt = require('jsonwebtoken')
  jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
    if (err) {
      throw(err);
    } else {
      callback(decoded.login);
    }
  })
}

function fillHistory(login, recipient, callback) {
  chat.getMessages(login, recipient, (err, result) => {
    if (result.length > 0) {
      callback(result)
    }
  });
}

io.on('connection', function(socket) {
  console.log('socketid is: ' + socket.id)
  // Adds socket.id to active user sessions list
  userSockets.push(socket.id)
  console.log('connected sockets: ' + userSockets)

  socket.on('GET_MESSAGES', function(data){
    // Show history with 'anyone fo nao' from database
    getUsername(data.token, login => {
      fillHistory(login, 'anyone fo nao', res => {
        var history = res
        io.emit('GET_MESSAGES', history)
      })
    })

  })

  socket.on('SEND_MESSAGE', function(data) {
    getUsername(data.token, login => {
      data.login = login
    })
    // TO DO: recipient depending on how the message is sent
    data.recipient = 'anyone fo nao'
    chat.storeMessage(data)
    // Pushes message to screen with sockets
    io.emit('MESSAGE', data)
  })

  socket.on('disconnect', function () {
    console.log('User disconnected')
    // On disconect event, remove socket.id from array
    if (userSockets.length >= 1) {
      for(var i = userSockets.length - 1; i >= 0; i--) {
        if(userSockets[i] === socket.id) {
          userSockets.splice(i, 1)
        }
      }
    }
  })
})
