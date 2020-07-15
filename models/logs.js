const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
	date: { type: String },

	dom_helpsEntered: { type: Number },

	visitorsEntered: { type: Number },
});

const Logs = mongoose.model("Logs", logsSchema);

module.exports = Logs;
