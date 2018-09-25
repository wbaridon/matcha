var jwt = require('jsonwebtoken');

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
