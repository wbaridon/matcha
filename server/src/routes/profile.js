var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var profile = require('../models/profile.js');
var interests = require('../models/interests.js');
var account = require('../models/account.js');
var notifications = require('../models/notifications.js');
var matches = require('../models/matches.js');
var blacklist = require('../models/blacklist.js');
var helpers = require('../utils/helpers.js')
var jwt = require('jsonwebtoken');
var NodeGeocoder = require('node-geocoder')
var geocoder = NodeGeocoder({
		provider: 'locationiq',
		httpAdapter: 'https',
		apiKey: '2c29b16aa6aabf'
});
var crypto = require('crypto')
var path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
		destination: '../client/static/images/uploads',
		filename: function (req, file, callback) {
			crypto.pseudoRandomBytes(16, function(err, raw) {
				if (err) return callback(err);
    		callback(null, raw.toString('hex')+path.extname(file.originalname))
			});
		}
})
const upload = multer({storage:storage})

router.get('/', (req, res) => {
	res.send('The server is working...')

})

router.post('/view', function(req, res) {
    userId = req.body.id
    view(userId, user => {
      res.send(user)
    });
})

router.post('/edit', function(req, res) {
  // On recupere les data, puis il faudra faire le update avant de renvoyer a la Vue
  // Actuellement l'update n'est pas encore fait
  user = req.body.user
  jwt.verify(req.body.token, 'MatchaSecretKey', function(err, decoded) {
		if (err) {
		 throw(err);
	 } else {
      user.login = decoded.login
      userId = decoded.id
      view(userId, user => {
        res.send(user)
      });
		}
  });
})


router.post('/fakeReport', function(req, res) {
	profile.select(req.body.id, (err, result) => {
			var nbr = result[0].fakeReport + 1
			profile.updateUser(req.body.id, 'fakeReport',nbr, callback => {
				res.send(callback)
			})
	})
})


router.post('/uploadPic', upload.single('userPic'), (req, res, next) => {
	if (!req.file) {
		return res.send({success: false})
	} else {
		if (!req.body.isProfile) {
			req.body.isProfile = 0;
		}
		profile.addPic(req.body.id, req.body.isProfile, req.file.filename, callback => {
				setTimeout(function() {
					res.send({success: true})
				}, 1000);
		})
	}
})

router.post('/getPic', function(req, res) {
		profile.getPic(req.body.id, callback => {
				images= {
					gallery: callback,
					count: callback.length
				}
				return res.send(images)
		})
})

router.post('/getInterests', function(req, res) {
		interests.getUser(req.body.id, callback => {
				return res.send(callback[0])
		})
})

router.post('/getInterestsList', function(req, res) {
		interests.getInterestsList(callback => {
			array = callback.map(v => v.COLUMN_NAME)
				return res.send(array)
		})
})

router.post('/addInterest', function(req, res) {
		interest = req.body.data
		id = req.body.id
		interests.getInterestsList(callback => {
			array = callback.map(v => v.COLUMN_NAME)
			if (array.indexOf(interest) > -1) {
				interests.update(interest, id, 1, callback => {
					res.send(callback)
				})
			}	else {
				interests.addNew(interest, id, callback => {
					callback = interests.update(interest, id, 1, result => {
						res.send(result)
					})
				})
			}
		})
})

router.post('/blockUser',  function(req, res) {
		helpers.getId(req.body.token, id => {
			blacklist.blockUser(req.body.id_blocked, id, (err, result) => {
				res.send(result)
			})
		})
})

router.post('/deleteInterest', function(req, res) {
		interest = req.body.data
		id = req.body.id
		interests.update(interest, id, 0, callback => {
			res.send(callback)
		})
})

router.post('/deletePic', function(req, res) {
		profile.deletePic(req.body.idAccount, req.body.id, callback => {
				return res.send('done')
		})
})

router.post('/newProfilePic', function(req, res) {
	profile.updateProfilePic(req.body.idAccount, req.body.id, callback => {
			return res.send('done')
	})
})

router.post('/updateBio', function(req, res) {
  bio = req.body.bio
  id = req.body.id
  profile.updateUser(id, 'bio', bio, (err, result) => {
    if (err)
      throw err
    else
    res.send(bio)
  })
})

router.post('/updatePref', function(req, res) {
  id = req.body.id
  profile.updateUser(id, 'sexuality', req.body.user.sexuality, (err, result) => {
    if (err)
      throw err
    else
      view(id, user => {
        res.send(user)
      })
  })
})

router.post('/updatePerso', function(req, res) {
  id = req.body.id
	console.log(req.body)
  profile.updateUser(id, 'name', req.body.user.name, (err, result) => {
    profile.updateUser(id, 'firstname', req.body.user.firstname, (err, result) => {
      account.updateUser(id, 'email', req.body.user.email, (err, result) => {
        profile.updateUser(id, 'age', req.body.user.age, (err, result) => {
          profile.updateUser(id, 'gender', req.body.user.gender, (err, result) => {
            view(id, user => {
              res.send(user)
            })
          })
        })
      })
    })
  })
})

router.post('/localisation', function(req, res) {

	lon = req.body.long
	lat = req.body.lat
	id = req.body.user.id
	geocoder.reverse({lat, lon})
	.then(call => {
		profile.updateUser(id, 'zipcode', call[0].zipcode, (err, result) => {
			profile.updateUser(id, 'city', call[0].city, (err, result) => {
				profile.updateUser(id, 'latitude', lat, (err, result) => {
					profile.updateUser(id, 'longitude', lon, (err, result) => {
						view(id, user => {
							res.send(user)
						})
					})
				})
			})
		})
	})
	.catch(function(err) {
		throw err;
	})
})

router.post('/persoLoc', function (req, res) {
	id = req.body.id
	geocoder.geocode({ address: req.body.city, zipcode: req.body.zipcode, country: 'France'})
	.then(call => {
		if (call[0].countryCode === 'FR') {
			profile.updateUser(id, 'zipcode', call[0].zipcode, (err, result) => {
				profile.updateUser(id, 'city', call[0].city, (err, result) => {
					profile.updateUser(id, 'latitude', call[0].latitude, (err, result) => {
						profile.updateUser(id, 'longitude', call[0].longitude, (err, result) => {
								res.send('Ok')
						})
					})
				})
			})
		} else {
			res.send({feedback: 'Votre localisation doit etre en France'})
		}
	})
	.catch(err => {
		res.send({feedback: 'Localisation non trouvé'})
	})
})

router.post('/updatePwd', function(req, res) {
		console.log(req.body)
		id = req.body.id
		oldpwd = req.body.password.oldpwd
		newpwd = req.body.password.newpwd
	account.userLoginFromId(id, (err, data) => {
		argon2.verify(data[0].password, oldpwd).then(match => {
			if (match) {
				argon2.hash(newpwd).then(hash => {
					account.updateUser(id, "password", hash)
					res.send('Password changed')
				})
			} else {
				res.send({'error':1})
			}
		})
	})
})

router.post('/userLikeUs', function(req, res) {
	notifications.getActionsFromEmitter(req.body.id, 0, (err, result) => {
		if (result.length > 0 ) {
			res.send(true)
		} else {
			notifications.getActionsFromEmitter(req.body.id, 3, (err, final) => {
				if (final.length > 0) {
					res.send(true)
				} else { res.send(false) }
			})
		}
	})
})

router.post('/userMatched', function(req, res) {
	matches.getMatchesAsReceiver(req.body.id, (err, result) => {
		if (result.length > 0) {
			res.send(true)
		} else {
			matches.getMatchesAsEmitter(req.body.id, (err, final) => {
				if (final.length > 0) {
					res.send(true)
				} else { res.send(false) }
			})
		}
	})
})

module.exports = router;

function view (userId, callback) {
    account.isUser(userId, result => {
      if (result > 0) {
        fillProfile(userId, rawData => {
          convertUserData(rawData, newUser => {
            account.selectForProfile(userId, extraInfo => {
              newUser.email = extraInfo.email;
							newUser.isOnline = extraInfo.isOnline;
							newUser.lastVisit = extraInfo.lastVisit;
              callback(newUser)
            })
          });
        })
      } else {
          user = { userExist: false }
          callback(user)
        }
    });
}

function fillProfile(userId, callback) {
  profile.select(userId, (err, result) => {
    if (result.length > 0) {
				user = result[0]
        user = {
          userExist: true,
          id: userId,
          firstname: result[0].firstname,
          name: result[0].name,
          sexuality: result[0].sexuality,
          age: result[0].age,
          gender: result[0].gender,
          bio: result[0].bio,
          email: '',
					zipcode: result[0].zipcode,
					city: result[0].city,
					isFill: result[0].isFill,
					popularite: result[0].popularite,
        }
      callback(user)
    }
  });
}

function convertUserData(user, callback) {
  // synchrone ou asynchrone ?
  switch (user.gender) {
    case 0:
      user.gender = 'Homme';
      break;
    case 1:
      user.gender = "Femme";
      break;
  }
  switch (user.sexuality) {
    case 0:
      user.sexuality = 'Hetero';
      break;
    case 1:
      user.sexuality = 'Homo';
      break;
    case 2:
      user.sexuality = 'Bisexuel';
      break;
  }
  callback(user)
}
