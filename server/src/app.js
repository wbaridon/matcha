const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const helpers = require('./utils/helpers.js')
const jwt = require('jsonwebtoken')

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
app.use('/notifications', require('./routes/notifications'))
app.use('/matches', require('./routes/matches'))
app.use('/chat', require('./routes/chat'))

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

function fillHistory(idsender, idrecipient, callback) {
  chat.getMessages(idsender, idrecipient, (err, result) => {
    callback(result)
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
  if (getCookie('authToken', socket)) { // Check si on a un cookie sinon cela bug
    console.log('Cookie: '+getCookie('authToken', socket))
    helpers.getId(getCookie('authToken', socket), function(r){
      if (!userSockets['id'+r]) {
        userSockets['id'+r] = new Array(socket.id)
      }
      else
        userSockets['id'+r].push(socket.id)
      socket.myUsername = r
    });
    console.log('\n' + socket.myUsername + ' is: ' + socket.id + '\n')
    console.log(userSockets)

    // LOADS MESSAGES FROM DATABASE

    socket.on('GET_MESSAGES', function(data){
      // Shows history from database
      helpers.getId(data.token, id => {
        fillHistory(id, data.recipient, res => {
          var i = 0
          while (userSockets['id'+id][i]) {
            io.to(userSockets['id'+id][i]).emit('GET_MESSAGES', res);
            i++;
          }
        })
      })
    })

    // ON SEND MESSAGE EVENT

    socket.on('SEND_MESSAGE', function(data) {
      if (!data.recipient)
        return
      helpers.getId(data.token, id => {
        data.userid = id
      })
      chat.storeMessage(data)
      // Pushes message to screen with sockets
      // --> To recipient
      if (userSockets['id'+data.recipient]) {
        console.log('Recipient='+data.recipient)
        getUsernameFromId(data.userid, username => {
          data.login = username[0].login
          for (var i = 0; i < userSockets['id'+data.recipient].length; i++) {
            io.to(userSockets['id'+data.recipient][i]).emit('MESSAGE', data);
          }
        })
      }
      // --> to sender
      getUsernameFromId(data.userid, username => {
        data.login = username[0].login
        for (var i = 0; i < userSockets['id'+data.userid].length; i++) {
          io.to(userSockets['id'+data.userid][i]).emit('MESSAGE', data);
        }
      })
    })

    // ON VISIT A NEW PROFILE
    socket.on('PROFILE_VISIT', function(data) {
      helpers.getUsername(data.token, login => {
        data.login = login

        console.log('ici') // A faire
      })
    })

    // WHEN SOCKET DISCONNECTS
    socket.on('disconnect', function () {
        console.log(socket.myUsername+' disconnected')
        let userIDs = userSockets['id'+socket.myUsername]
        if (userIDs.length >= 1) {
          for (var i = userIDs.length - 1; i >= 0; i--) {
            if (userIDs[i] === socket.id) {
              userIDs.splice(i, 1)
              if (!Array.isArray(userIDs) || !userIDs.length) {
                delete userIDs
              }
            }
          }
        }
      })
    }
  })
