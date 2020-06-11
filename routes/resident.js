var express = require("express"),
	router = express.Router();

router.get("/", function (req, res) {
	res.render("./index");
});

router.get("/user", function (req, res) {
	res.render("./user/home");
});

router.get("/user/dom_help", function (req, res) {
	res.render("./user/dom_help/home");
});

router.get("/user/dom_help/new", function (req, res) {
	res.render("./user/dom_help/new");
});

router.get("/user/visitor", function (req, res) {
	res.render("./user/visitor/home");
});

router.get("/user/visitor/new", function (req, res) {
	res.render("./user/visitor/new");
});

module.exports = router;
