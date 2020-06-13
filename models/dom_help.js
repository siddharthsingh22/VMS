const mongoose = require("mongoose");

const timeStampsSchema = new mongoose.Schema({
	date: { type: String, required: true, unique: true },
	checkIn: { type: String },
	checkOut: { type: String },
});

const timeStamps = mongoose.model("timeStamp", timeStampsSchema);

const dom_helpSchema = new mongoose.Schema({
	id: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	aadharNo: { type: Number, required: true },
	address: { type: String, required: true },
	image: { type: String, required: true },
	phoneNo: { type: Number },
	timeStamps: { type: [timeStampsSchema], unique: false },
});

const Dom_helps = mongoose.model("Dom_help", dom_helpSchema);

module.exports = Dom_helps;
