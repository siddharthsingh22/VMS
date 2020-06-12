var express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	session = require("express-session"),
	bcrypt = require("bcryptjs"),
	MongoStore = require("connect-mongo")(session),
	Residents = require("../models/resident");

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
			maxAge: 1000 * 20, // does not allow to use .env variables ???
			// secure: true,
		},
	})
);
// ======================================
// Middleware function
// ======================================
const redirectLogin = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.redirect("/user/login");
	}
};

const redirectUser = (req, res, next) => {
	if (req.session.userId) {
		res.redirect("/user");
	} else {
		next();
	}
};

// ======================================
// Routes
// ======================================

router.get("/", function (req, res) {
	res.render("./index");
});

router.get("/user", redirectLogin, function (req, res) {
	res.render("./user/home");
});

router.get("/user/dom_help", redirectLogin, function (req, res) {
	res.render("./user/dom_help/home");
});

router.get("/user/dom_help/new", redirectLogin, function (req, res) {
	res.render("./user/dom_help/new");
});

router.get("/user/visitor", redirectLogin, function (req, res) {
	res.render("./user/visitor/home");
});

router.get("/user/visitor/new", redirectLogin, function (req, res) {
	res.render("./user/visitor/new");
});

// =======================
// Auth Routes
// =======================

router.get("/user/login", redirectUser, function (req, res) {
	res.render("./user/login", { success: "", error: "" });
});

router.get("/user/register", redirectUser, function (req, res) {
	res.render("./user/register", { error: "" });
});

router.post("/user/login", redirectUser, function (req, res) {
	Residents.findOne({ email: req.body.login.email })
		.then((returnedUserFromDb) => {
			bcrypt
				.compare(req.body.login.password, returnedUserFromDb.password)
				.then((resHash) => {
					if (resHash) {
						req.session.userId = returnedUserFromDb._id;
						res.redirect("/user");
					} else {
						res.render("./user/login", { error: "Incorrect Password", success: "" });
					}
				})
				.catch((err) => {
					res.render("./user/login", { error: "Error in generating hash. Please try again", success: "" });
				});
		})
		.catch(() => {
			res.render("./user/register", { error: "Email not registered" });
		});
});

router.post("/user/register", function (req, res) {
	if (req.body.register.password === req.body.register.confirmPassword) {
		bcrypt
			.genSalt(10)
			.then((salt) => {
				return bcrypt.hash(req.body.register.password, salt);
			})
			.then((hash) => {
				Residents.create({
					name: req.body.register.name,
					email: req.body.register.email,
					phoneNo: req.body.register.phoneNo,
					password: hash,
				})

					.then((returnedUserFromDb) => {
						console.log("New user created");
						res.render("./user/login", { success: "Account Created !! Login Now", error: "" });
					})
					.catch((err) => {
						res.render("./user/register", { error: "Email already registered" });
					});
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.render("./user/register", { error: "Both passwords must match" });
	}
});

router.get("/user/logout", function (req, res) {
	req.session.userId = "";
	res.redirect("/user/login");
});

module.exports = router;
