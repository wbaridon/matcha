var User = db.define('user', {
	id: {type: 'serial', key: true },
	login: {type: 'text'},
	password: {type: 'text'},
	email: {type: 'text'}
}, {
	methods : {
		getLogin: function() {
			return this.login;
		}
		getId: function() {
			return this.id;
		}
		getPassword: function() {
			return this.password;
		}
		getEmail: function() {
			return this.email;
		}
	}
});

/*

 Here's an example of the usage of this model:

Person.get(73, function(err, person) {
  if (err) throw err;

  console.log('Hi, my name is ' + person.fullName());
});
This would get person with id=73 and print it's name and surname. There are other types of [properties available](Model Properties).

*/