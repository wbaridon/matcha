const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const helpers = require('./utils/helpers.js')
const block = require('./utils/block.js')
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
const matches = require('./models/matches.js')
const notifications = require('./models/notifications.js')
const profile = require('./models/profile.js')
const accounts = require('./models/account')

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
    accounts.updateUser(socket.myUsername, 'isOnline', 1)
    console.log(userSockets)

    // LOADS MESSAGES FROM DATABASE

    socket.on('GET_MESSAGES', function(data){
      // Shows history from database
      helpers.getId(data.token, id => {
        fillHistory(id, data.recipient, res => {
          var i = 0
          while (userSockets['id'+id][i]) {
            io.to(userSockets['id'+id][i]).emit('GET_MESSAGES', {res, 'recipient': data.recipient });
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
      notifications.newAction(2, data.recipient, data.userid)
      if (userSockets['id'+data.recipient]) {
        var i = 0
        while (userSockets['id'+data.recipient][i]) {
          io.to(userSockets['id'+data.recipient][i]).emit('UPDATE_NOTIF', data);
          i++;
        }
      }
      // Pushes message to screen with sockets
      // --> To recipient
      sendNotifications(data); // Je l'ai deporter en bas pour pouvoir la
      //re utiliser a voir si on peut rendre code + universel egalement pour le receiver
      // --> to sender
      getUsernameFromId(data.userid, username => {
        data.login = username[0].login
        data.messageReceive = 0
        for (var i = 0; i < userSockets['id'+data.userid].length; i++) {
          io.to(userSockets['id'+data.userid][i]).emit('MESSAGE', data);
        }
      })
    })

    // ON VISIT A NEW PROFILE
    socket.on('profileNewAction', function(data) {
      helpers.getId(data.token, id => {
        data.emitter = id
        if (data.emitter != data.receiver) {
          block.BlockStatus(data.receiver, data.emitter).then(blockedOrNot => {
          if (!blockedOrNot) {
            var i = 0
            if (userSockets['id'+data.receiver]) {
              while (userSockets['id'+data.receiver][i]) {
                io.to(userSockets['id'+data.receiver][i]).emit('UPDATE_NOTIF', data);
                i++;
              }
            }
            profileNewAction(data)
          }
        })
      }
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
                accounts.updateUser(socket.myUsername, 'isOnline', 0)
                delete userIDs
              }
            }
          }
        }
      })
    }
  })

function sendNotifications(data) {
  if (userSockets['id'+data.recipient]) {
    getUsernameFromId(data.userid, username => {
      data.login = username[0].login
      data.messageReceive = 1
      for (var i = 0; i < userSockets['id'+data.recipient].length; i++) {
        console.log('emet le message au recipient ' + data.recipient)
        io.to(userSockets['id'+data.recipient][i]).emit('MESSAGE', data);
      }
    })
  }
}

function profileNewAction(data) {
  switch (data.action) {
    case 0:
      checkNewLike(data)
      profile.addPopularite(data.receiver, 25)
      break;
    case 1:
      notifications.newAction(data.action, data.receiver, data.emitter)
      profile.addPopularite(data.receiver, 10)
      break;
    case 4: deleteLike(data)
      break;
  }
}

function checkNewLike(data) {
  // On check si l'autre ne nous a pas deja like

  notifications.getAllFrom(data.emitter, 0, (err, result) => {

    if (result.length != 0) {
      // L'autre nous a deja like
      notifications.newAction(3, data.receiver, data.emitter)
      profile.addPopularite(data.receiver, 50)
      profile.addPopularite(data.emitter, 50)
    } else {
      // L'autre ne nous a pas encore like
     notifications.newAction(0, data.receiver, data.emitter)
    }
  })

}

function deleteLike(data) {
  // On check si l'autre nous avait like ou pas car c'etait un match et on doit donc envoyer une notif
  // Sinon on retire simplement le like
  matches.checkMatched(data.receiver, data.emitter, (err, result) => {
      if (result.length != 0) {
        notifications.getLikeAction(data.emitter, data.receiver, (err, id) => {
          switch (id[0].action) {
            case 3:
              notifications.deleteAction(3, data.receiver, data.emitter)

              notifications.newAction(4, data.receiver, data.emitter)
              break;
            case 0:
                notifications.deleteAction(0, data.receiver, data.emitter)
                notifications.newAction(4, data.receiver, data.emitter)
                notifications.changeAction(3, 0, data.receiver, data.emitter)
            // En plus d'update on va devoir passer l'autre 3 en 0
              break;
          }
        })
        // Il y a un match, on va supprimer le like mais il faut prevenir l'autre via socket io
      //  notifications.newAction(4, data.receiver, data.emitter)
      } else {
        // Ce n'est pas un match
        notifications.deleteAction(0, data.receiver, data.emitter)
      }
  })

}
