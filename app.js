
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./config/db');

var app = express();
// app.set('view engine', 'ejs'); pour ne pas mettre .ejs dans les render
app.use('/public', express.static('public'));
app.use(session({
	name: 'session',
	keys: ['M42atchaW?baridoN'],
}))


app.use('/register', require('./routes/register'))

app.get('/', function(req, res) {
	res.render('home.ejs');
	/* Test prochain de vue
	new Vue({
		el: '#vue-app',
		data: {
			name: 'Test',   et dans vue app html on pourra mettre {{ name }}
			website: 'www.test.fr' // data binding pr href par exemple v-bind:href="website" raccourci :href
			// on peut bind le input pour value
			// si on veut inserer aussi les balises a on fait balise p v-html="websitetagexemple"
		},
		methods: {
		greet: function(time) // pour l'appeller {{greet('afternoon')}}
			return 'Good' + time + '' + this.name;
		},
		add: function(){
		this.age++;
	}
	});

	// button v-on:click="methode add ou code avec age++ par exemple si on avait un age " pour faire des events
	// on peut externaliser la methode idem avec add et substract en method
	// raccourci @click @dblclick @mousemove
	@click.once pour ecouter event que une fois .prevent pour changer la defaut behaviour
	// two way binding <input type='text' v-model='name' pour l'attacher a name et ainsi le name sera update
	au lieu de mettre dans method pour computed on met dans computed pour uniquement maj si changement
	*/
})

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);
