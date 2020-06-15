const mongoose = require("mongoose");

const visitingRecordSchema = new mongoose.Schema({
	purpose: { type: String, required: true },
	otp: { type: Number },
	expecArrival: { type: Date, required: true },
	expecDeparture: { type: Date, required: true },
	actualArrival: { type: Date },
	actualDeparture: { type: Date },
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
