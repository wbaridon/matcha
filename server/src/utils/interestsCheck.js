
function getFilter(filter, interest) {
	return new Promise ((resolve, reject) => {
		filter += ' AND interests.`'+interest+'`=1'
		resolve(filter)
	})
}
async function checkInterests(interests, callback) {
	newfilter = ''
	for (var i = 0; i < interests.length; i++) {
			newfilter = await getFilter(newfilter, interests[i])
	}
	callback(newfilter)
}

function commonTagCount() {

}

module.exports.checkInterests = checkInterests;
