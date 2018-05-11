
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
app.use('/login', require('./routes/login'))

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
	// dynamic classes v-bind:class="{available: available}" -- c'est un objet donc une seule accolade
	data available: false si on met true available apparaitra au dessus en tant que class

	// conditionnal v-if="error" si faux n'apparait pas, la valeur est dans nos datas
	// on peut avoir aussi v-else-if
	// v-show='error' similaire mais difference apparait dans le dom avec display none
	// v-for exemple li vi-for"x in name">{{name}}</li> Si on a un objet avec plusieurs propriete dans une ligne
	// on peut faire le meme mais avec {{test.name}} {{test.age}} et pour output l'index on met (x, index) avec {{index}}
	// possible de faire template v-for et </template> si on veut pas rajouter une balise
	Pour creer plusieurs vues on va faire var one = new Vue ...
	La variable permet de les faire interargir exemple button v-on:click="changeTitle">
	et on creer la methode dans app 2 changeTitle: function() { one.title = ... }
	on peut aussi changer les choses en dehors des vues two.title = ...;
	Pour faire un template avec un vue on peut utiliser un compenent pour l utiliser a plusieurs endroits
	Vue.component('name', {
	template: '<p>test</p>'
}); et pour l utiliser dans la vue on met dans le index html <name></name>
si on veut mettre des data doit etre une fonction qui retourne un objet
data: function () {
return {
	name: 'Yoshi'
}
}
pour donner une ref a un element ref="test" et dans la vue on peut y acceder apres this.$refs.test.value pour acceder a la valeur par exemple
// pour stylise uniquement un compenent on fait <style scoped></style>
	*/

})

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);
