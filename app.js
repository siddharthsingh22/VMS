var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	seedDb = require("./seed"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/vms", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
require("dotenv").config();

mongoose
	.connect(`mongodb+srv://Apml:Apml1234@cluster0.wfpmr.mongodb.net/vms?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected to db");
	})
	.catch((err) => {
		console.log("There is an error" + err.message);
	});

app.listen("3000", function (req, res) {
	console.log("VMS server has started");
});
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static("public"));
// seedDb();
app.use(require("./routes/resident"));
app.use(require("./routes/security"));
app.use(require("./routes/admin"));

app.get("*", function (req, res) {
	res.send("404 Page Not Found");
});
