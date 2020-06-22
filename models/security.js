const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	id: { type: String, required: true },
	password: { type: String, required: true },
	phoneNo: { type: Number },
	address: { type: String },
	aadharNo: { type: String, required: true },
	designation: { type: String, required: true },
	remarks: { type: String },
	image: { type: Buffer, required: true },
	imageType: { type: String, required: true },
});
securitySchema.virtual("securityImagePath").get(function () {
	if (this.image != null && this.imageType != null) {
		return `data:${this.imageType};charset=utf-8;base64,${this.image.toString("base64")}`;
	}
});
const Securities = mongoose.model("Security", securitySchema);

module.exports = Securities;
