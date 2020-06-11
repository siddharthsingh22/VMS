var express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

app.listen("3000", function (req, res) {
	console.log("vms server has started");
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// ====================================
// Resident Routes
// ====================================

app.get("/", function (req, res) {
	res.render("./index");
});

app.get("/user", function (req, res) {
	res.render("./user/home");
});

app.get("/user/dom_help", function (req, res) {
	res.render("./user/dom_help/home");
});

app.get("/user/dom_help/new", function (req, res) {
	res.render("./user/dom_help/new");
});

app.get("/user/visitor", function (req, res) {
	res.render("./user/visitor/home");
});

app.get("/user/visitor/new", function (req, res) {
	res.render("./user/visitor/new");
});
