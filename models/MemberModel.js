// Importer mysql
Schema = mysql.Schema,
ObjectId = Schema.ObjectId;

var MemberSchema = new Schema({
	id		: ObjectId,
	login 	: { type: String, required: true},
});

module.exports = mysql.model('Members', MemberSchema);