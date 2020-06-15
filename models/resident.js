const mongoose = require("mongoose");

const visitorConnectionSchema = new mongoose.Schema({
	visitorId: { type: String },
	visitingId: { type: String },
});

const VisitorConnections = mongoose.model("VisitorConnection", visitorConnectionSchema);

const residentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phoneNo: { type: Number, required: true },
	password: { type: String, required: true },
	regDom_Help: { type: Array, unique: true },
	visitorsArray: [visitorConnectionSchema],
});

const Residents = mongoose.model("resident", residentSchema);

module.exports = Residents;
