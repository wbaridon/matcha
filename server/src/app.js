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
    res.send('The server is working...')
})




// =======================================================





const server = app.listen(process.env.PORT || 8081)

const io = require('socket.io')(server, {
 pingInterval: 1000,
 pingTimeout: 5000,
})
const chat = require('./models/chat.js')

function getUsernameFromToken(token, callback) {
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

function getUsernameFromId(userId, callback) {
  chat.getUsernameFromId(userId, (err, result) => {
    if (result.length > 0) {
      callback(result);
    }
  });
}

function getCookie(cname, socket) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(socket.handshake.headers.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



// ====================================================



// Active user sessions will be stored here
var userSockets = new Array()

io.on('connection', function(socket) {

  // CONNECTION EVENT

  getUsernameFromToken(getCookie('authToken', socket), function(r){
    if (!userSockets[r]) {
      userSockets[r] = new Array(socket.id)
    }
    else
      userSockets[r].push(socket.id)
    socket.myUsername = r
  });
  console.log('\n' + socket.myUsername + ' is connected with: ' + socket.id + '\n')
  console.log(userSockets)

  // LOADS MESSAGES FROM DATABASE

  socket.on('GET_MESSAGES', function(data){
    if (data.recipient == null)
      return
    getUsernameFromToken(data.token, login => {
      fillHistory(login, data.recipient, res => {
        var history = res
        io.emit('GET_MESSAGES', history)
      })
    })
  })

  // ON SEND MESSAGE EVENT

  socket.on('SEND_MESSAGE', function(data) {
    if (data.recipient == null || data.message == null || data.token == null)
      return
    getUsernameFromToken(data.token, login => {
      data.login = login
    })
    getUsernameFromId(data.recipient, result => {
      data.recipient = result[0].login
      chat.storeMessage(data)
    })
    // Pushes message to screen with sockets
     io.to(userSockets[data.recipient][0]).emit('MESSAGE', data.message);
  })

  // WHEN SOCKET DISCONNECTS

  socket.on('disconnect', function () {
    console.log('User disconnected')
    let userIDs = userSockets[socket.myUsername]
    if (userIDs.length >= 1) {
      for (var i = userIDs.length - 1; i >= 0; i--) {
        if (userIDs[i] === socket.id) {
          userIDs.splice(i, 1)
        }
      }
    }
  })
})
