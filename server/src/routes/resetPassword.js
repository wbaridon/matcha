var express = require('express')
var router = express.Router()
var argon2 = require('argon2')
var model = require('../models/account.js')
var myhash = require('../utils/hash')
var mail = require('nodemailer')

passwordHash = (pass, callback) => {
    console.log(pass);
    myhash.hash(pass, res => {
        callback(res);
    })
}

sendMail = user => {
	var tunnel = mail.createTransport ({
		service: 'gmail',
		auth: {
				user: 'matchawb@gmail.com',
				pass: '42camagru'
		}
	})
	passwordHash(user.timestampPassword + user.password + user.email, hash => {
		var mailOptions = {
			from: 'matchawb@gmail.com',
			to: user.email,
			subject: 'Reset de votre mot de passe',
            text: 'Bonjour , vous avez demande une reinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour acceder au formulaire de reinitialisation: http://localhost:8080/resetPassword?email=' + user.email + '&key=' + hash
        }
		tunnel.sendMail(mailOptions, function(err, info){
			if (err) {
				console.log(err)
			} else {
				console.log('Email sent:' + info.response)
			}
		})
	})
}

afterMail = (client, email, key, newPW) => {
    model.userTimestampPasswordFromEmail(email, (err, res) => { //Mail existing in DB with associated timestampPassword
        if (err) throw err;
        else if (res[0].timestampPassword !== 0) {
            console.log("Let's reset the password !")
            passwordHash(user.timestampPassword + user.password + user.email, hash => {
                if (hash === key) {
                    model.updateUser(res[0].id, "timestampPassword", 0)
                    argon2.hash(user.password).then(hash => {
                        model.updateUser(res[0].id, "password", hash)
                        console.log("Password changed, timestampPassword reinitialised (Stop form change password again form same email link)");
                    })
                }
                else
                    console.log("Hash and key not corresponding")
            })
        }
        else {
            console.log("No password resetting to do.")
        }
    })
}

beforeMail = (client, email, login) => {
    model.userTimestampPasswordFromEmailLogin(email, login, (err, res) => { //Mail + login existing in DB with associated timestampPassword
        if (err) throw err;
        else if (!res[0])
            client.send("This user doesn't exists");
        else {
            console.log("Need to send mail and to reset the timestamp.")

            let timestamp = Date.now()
            model.updateUser(res[0].id, "timestampPassword", timestamp)
            sendMail({
                timestampPassword: timestamp,
                password: res[0].password,
                email: email
            });
        }
    })
}

router.post('/', function (req, res) {
    if (req.body.email && req.body.key && req.body.pass1 && req.body.pass2) { // AFTER MAIL
        console.log("Need to reset password if all infos especially key are correct.")
        if (req.body.pass1 === req.body.pass2)
            afterMail(res, req.body.email, req.body.key, req.body.pass1)
        else
            console.log("Passwords not corresponding.");
    }
    else if (req.body.email && req.body.login) { // BEFORE MAIL
        console.log("Need to send email if all infos are correct.")
        beforeMail(res, req.body.email, req.body.login)
    }
});

module.exports = router;
