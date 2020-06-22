const mongoose = require("mongoose");

const timeStampsSchema = new mongoose.Schema({
	date: { type: String },
	checkIn: { type: String },
	checkOut: { type: String },
});

const timeStamps = mongoose.model("timeStamp", timeStampsSchema);

const dom_helpSchema = new mongoose.Schema({
	id: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	aadharNo: { type: Number, required: true, unique: true },
	address: { type: String, required: true },
	image: { type: Buffer, required: true },
	imageType: { type: String, required: true },
	phoneNo: { type: Number },
	timeStamps: { type: [timeStampsSchema] },
});

dom_helpSchema.virtual("coverImagePath").get(function () {
	if (this.image != null && this.imageType != null) {
		return `data:${this.imageType};charset=utf-8;base64,${this.image.toString("base64")}`;
	}
});
const Dom_helps = mongoose.model("Dom_help", dom_helpSchema);

module.exports = Dom_helps;
