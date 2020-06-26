const mongoose = require("mongoose");

const visitingRecordSchema = new mongoose.Schema({
	purpose: { type: String, required: true },
	otp: { type: Number },
	expecArrival: { type: String, required: true },
	expecDeparture: { type: String, required: true },
	actualArrival: { type: String },
	actualDeparture: { type: String },
	residentEmail: { type: String },
	residentName: { type: String },
});

const VisitingRecords = mongoose.model("VisitingRecord", visitingRecordSchema);

const visitorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	aadharId: { type: String, required: true },
	isBlacklisted: { type: Boolean, default: false },
	visitingRecordArray: [visitingRecordSchema],
});

const Visitors = mongoose.model("Visitor", visitorSchema);

module.exports = Visitors;
