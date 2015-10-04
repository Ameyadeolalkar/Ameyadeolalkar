// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User   = new Schema({
	Firstname: String,
	Lastname: String,
	email: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	type: String,
	phoneNumber: String,
	Reservation: [{
		Reservation_ID: String,
		ReservationSlot: String,
		TableNumber: Number,
		NumberOfGuests: Number,
		ReservationDate: String,
	}]
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
