// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User   = new Schema({
	firstname: String,
	lastname: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	//type: String,
	phonenumber: String,
	reservation: [{
		reservation_ID: String,
		reservationSlot: String,
		tablenumber: Number,
		numberofguests: Number,
		reservationdate: String,
	}]
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
