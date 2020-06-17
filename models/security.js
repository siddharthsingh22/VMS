const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	id: { type: String, required: true },
	password: { type: String, required: true },
	phoneNo: { type: Number },
	address: { type: String },
});

const Securities = mongoose.model("Security", securitySchema);

module.exports = Securities;
