var express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

app.listen("3000", function (req, res) {
	console.log("vms server has started");
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./routes/resident"));
