const express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	Securities = require("../models/security");

router.use(
	session({
		name: process.env.SESSION_ID, // name of the session which would be send in the response
		resave: false, // don't know what this is
		saveUninitialized: false, // don't know what this is
		secret: process.env.SESSION_SECRET,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		rolling: true,
		cookie: {
			sameSite: true, // only same site cookie would be allowed
			maxAge: 1000 * 60 * 20, // does not allow to use .env variables ???
			// secure: true,
		},
	})
);

// =================================
// Middleware functions
// =================================

const redirectLogin = (req, res, next) => {
	if (!req.session.securityId) {
		res.redirect("/security/login");
	} else {
		next();
	}
};

const redirectSecurity = (req, res, next) => {
	if (req.session.securityId) {
		res.redirect("/security");
	} else {
		next();
	}
};

// =================================
// Security User Routes
// =================================

router.get("/security", redirectLogin, function (req, res) {
	res.render("./security/home");
});

// =================================
// Auth Routes
// =================================

router.get("/security/login", redirectSecurity, function (req, res) {
	res.render("./security/login", { error: "", success: "" });
});

router.post("/security/login", redirectSecurity, function (req, res) {
	Securities.findOne({ id: req.body.login.id })

		.then((returnedSecurityFromDb) => {
			if (returnedSecurityFromDb.password === req.body.login.password) {
				req.session.securityId = returnedSecurityFromDb._id;
				req.session.securityIdNumber = returnedSecurityFromDb.id;
				res.redirect("/security");
			} else {
				res.render("./security/login", { success: "", error: "Incorrect Passowrd" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.render("./security/login", { success: "", error: "Account Does Not Exist" });
		});
});

router.get("/security/logout", function (req, res) {
	req.session.destroy();
	res.redirect("/security/login");
});

module.exports = router;
