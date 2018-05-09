// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var db = require('../config/db');

router.get('/', function(req, res) {

	res.render('error.ejs', {error: 'Aucun message'});
})

router.get('/about', function(req, res) {
	var model = require('../models/test.js');
	console.log(model.test());
	res.send('About');
})

router.post('/', urlencodedParser, function (req, res) {
	console.log('Entre dans register');
	if (req.body.login == '' || req.body.password == '' && req.body.submit != "S'inscrire")
		res.render('error.ejs', {error: 'Merci de remplir tous les champs'});
	else {
		argon2.hash(req.body.password).then(hash => {
			console.log(hash);
})
	var model = require('../models/account.js');

	model.userExist(req.body.login, req.body.email, function(err, data) {
		user = data;
		console.log(user + 'dans boucle user exist');
		if (user == 0){
			console.log('Insertion en bdd a faire')
		}
		else
			res.render('error.ejs', {error: 'Utilisateur ou email déjà existant' });
	});
	//console.log('User exist fonction = ' + model.userExist(req.body.login, req.body.email));

	/*db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [req.body.login, req.body.email], function(err, result) {
		if (err) throw err;

        numRows = result.length;
        console.log(numRows);
        if (numRows < 1)
        {
        db.query('INSERT INTO accounts (login, email, password) VALUES (?, ?, ?)', [req.body.login, req.body.email, req.body.password], function(err, result) {
        if (err) throw err;
        else console.log('success');
    }); }
	});*/

    console.log(req.body.password);
}
	//res.redirect('/');
})

module.exports = router;
