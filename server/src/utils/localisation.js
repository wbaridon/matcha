var profile = require('../models/profile.js');
var geolib = require('geolib');
var NodeGeocoder = require('node-geocoder')
var geocoder = NodeGeocoder({
		provider: 'locationiq',
		httpAdapter: 'https',
		apiKey: '2c29b16aa6aabf'
});

function getDistance(user, id, callback) {
	profile.select(id, (err, result) => {
		lat = result[0].latitude
		long = result[0].longitude
		var counter = user.length;
		user.forEach(function (item, index, array) {
			if (item.latitude && item.longitude && lat && long) {
			 item.distance = geolib.getDistance(
				{latitude: lat, longitude: long},
				{latitude: item.latitude, longitude: item.longitude}
				);
		} else {
			item.distance = 'Non disponible'
		}
			counter--
			if (counter === 0) {
				callback(array)
			}
		})
	})
}

module.exports.getDistance = getDistance;
