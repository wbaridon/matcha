var jwt = require('jsonwebtoken');
var profile = require('../models/profile');
var interests = require('../models/interests');
var interestsCheck = require('./interestsCheck')

module.exports.getUsername = function(token, callback)
{
  jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
    if (err) {
      throw(err);
    } else {
      callback(decoded.login);
    }
  })
}

module.exports.getId = function(token, callback)
{
  jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
    if (err) {
      throw(err);
    } else {
      callback(decoded.id);
    }
  })
}


module.exports.profileIsFill = function(user, callback)
{
  var user = user[0]
  if (user.isFill !== 1) {
    interests.getUser(user.id, list => {
      delete list[0]['id'];
      delete list[0]['id_account'];
      interestsCheck.keepInterests(list[0])
      .then(result => {
        if (user.age > 18 && user.bio != '' && user.city != '' && result.length > 0) {
          profile.updateUser(user.id, 'isFill', 1, updated => {
            callback(1)
          })
        } else {
            callback(0)
        }
      })
    })
  } else {
    callback(1)
  }
}
