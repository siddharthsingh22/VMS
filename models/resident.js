const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phoneNo: { type: Number, required: true },
	password: { type: String, required: true },
});

const Residents = mongoose.model("resident", residentSchema);

module.exports = Residents;
