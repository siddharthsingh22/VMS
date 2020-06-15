var express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	session = require("express-session"),
	bcrypt = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
	nodemailer = require("nodemailer"),
	MongoStore = require("connect-mongo")(session),
	Dom_helps = require("../models/dom_help"),
	Visitors = require("../models/visitor"),
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
			maxAge: 1000 * 60 * 20, // does not allow to use .env variables ???
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
	Dom_helps.find()
		.then((returnedDom_HelpDataFromDb) => {
			Residents.findOne({ email: req.session.userEmail })
				.then((returnedResidentDataFromDb) => {
					res.render("./user/dom_help/home", { returnedDom_HelpDataFromDb: returnedDom_HelpDataFromDb, regDom_HelpArray: returnedResidentDataFromDb.regDom_Help });
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/user/dom_help/show/:id", redirectLogin, function (req, res) {
	Dom_helps.findOne({ id: req.params.id })
		.then((returnedDom_HelpDataFromDb) => {
			res.render("./user/dom_help/show", { returnedDom_HelpDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/user/dom_help/new", redirectLogin, function (req, res) {
	res.render("./user/dom_help/new");
});

router.post("/user/dom_help/new", redirectLogin, function (req, res) {
	Residents.findOne({ email: req.session.userEmail })
		.then((returnedResidentDataFromDb) => {
			returnedResidentDataFromDb.regDom_Help.push(parseInt(req.body.id));
			return returnedResidentDataFromDb.save();
		})
		.then((savedData) => {
			res.redirect("/user/dom_help");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/user/dom_help/new");
		});
});

router.get("/user/dom_help/delete/:id", function (req, res) {
	Residents.findOne({ email: req.session.userEmail })
		.then((returnedUserFromDb) => {
			returnedUserFromDb.regDom_Help.forEach((eachRegId) => {
				if (eachRegId === parseInt(req.params.id)) {
					// req.params.id is string and not a number
					const index = returnedUserFromDb.regDom_Help.indexOf(eachRegId);
					returnedUserFromDb.regDom_Help.splice(index, 1);
				}
			});
			return returnedUserFromDb.save();
		})
		.then(() => {
			res.redirect("/user/dom_help");
		})
		.catch((err) => {
			console.log(err);
		});
});
// =======================================
// Horribly implemented block begins
// =======================================

let dataObject = []; // pushing data into this array, after using this array is
// getting empty using dataObject.lenth = 0
i = 0;

router.get("/user/visitor", redirectLogin, function (req, res) {
	Residents.findOne({ email: req.session.userEmail })
		.then((returnedResidentDataFromDb) => {
			returnedResidentDataFromDb.visitorsArray.forEach((eachVisitorRefrence) => {
				Visitors.findOne({ _id: eachVisitorRefrence.visitorId })
					.then((returnedVisitorDataFromDb) => {
						returnedVisitorDataFromDb.visitingRecordArray.forEach((eachVisitingRecord) => {
							if (eachVisitingRecord._id == eachVisitorRefrence.visitingId) {
								dataObject.push({
									name: returnedVisitorDataFromDb.name,
									aadharId: returnedVisitorDataFromDb.aadharId,
									visitingRecord: eachVisitingRecord,
								});
							}
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
			if (i === 0) {
				res.redirect("/user/visitor");
			}

			if (i > 0) {
				res.render("./user/visitor/home", { dataObject });
				dataObject.length = 0;
			}
			i++;
		})
		.catch((err) => {
			console.log(err);
		});
});

// ==================================
// Horribly implemented block ends
// ==================================

router.get("/user/visitor/new", redirectLogin, function (req, res) {
	res.render("./user/visitor/new");
});

router.post("/user/visitor/new", function (req, res) {
	Visitors.findOne({ aadharId: req.body.new.aadharId })
		.then((returnedExistingVisitorFromDb) => {
			const randomNumber = Math.floor(100000 + Math.random() * 900000);
			returnedExistingVisitorFromDb.visitingRecordArray.push({
				purpose: req.body.new.purpose,
				expecArrival: req.body.new.expecArrivalTime,
				expecDeparture: req.body.new.expecDepartureTime,
				otp: randomNumber,
			});
			returnedExistingVisitorFromDb.save().then((updatedExistingVisitorFromDb) => {
				Residents.findOne({ email: req.session.userEmail })
					.then((returnedResidentDataFromDb) => {
						const len = updatedExistingVisitorFromDb.visitingRecordArray.length;
						returnedResidentDataFromDb.visitorsArray.push({
							visitorId: updatedExistingVisitorFromDb._id,
							visitingId: updatedExistingVisitorFromDb.visitingRecordArray[len - 1]._id,
						});
						return returnedResidentDataFromDb.save();
					})
					.then(() => {
						res.redirect("/user/visitor");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})

		.catch((err) => {
			Visitors.create({
				name: req.body.new.name,
				aadharId: req.body.new.aadharId,
			})
				.then((returnedNewVisitorFromDb) => {
					const randomNumber = Math.floor(100000 + Math.random() * 900000);
					returnedNewVisitorFromDb.visitingRecordArray.push({
						purpose: req.body.new.purpose,
						expecArrival: req.body.new.expecArrivalTime,
						expecDeparture: req.body.new.expecDepartureTime,
						otp: randomNumber,
					});
					returnedNewVisitorFromDb.save().then(() => {
						Residents.findOne({ email: req.session.userEmail })
							.then((returnedResidentDataFromDb) => {
								const len = returnedNewVisitorFromDb.visitingRecordArray.length;
								returnedResidentDataFromDb.visitorsArray.push({
									visitorId: returnedNewVisitorFromDb._id,
									visitingId: returnedNewVisitorFromDb.visitingRecordArray[len - 1]._id,
								});
								return returnedResidentDataFromDb.save();
							})
							.then(() => {
								res.redirect("/user/visitor");
							})
							.catch((err) => {
								console.log(err);
							});
					});
				})
				.catch((err) => {
					console.log(err);
				});
		});
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
						req.session.userEmail = returnedUserFromDb.email;
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

router.post("/user/register", redirectUser, function (req, res) {
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
						console.log("New User Created");
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

router.get("/user/reset", redirectUser, function (req, res) {
	res.render("./user/reset");
});

router.post("/user/reset", redirectUser, function (req, res) {
	Residents.findOne({ email: req.body.reset.email })
		.then((returnedUserFromDb) => {
			const secret = returnedUserFromDb.password;
			const userId = returnedUserFromDb.email;
			const token = jwt.sign({ userId }, secret, {
				expiresIn: 3600,
			});
			const transporter = nodemailer.createTransport({
				host: "smtp.mailtrap.io",
				port: 2525,
				auth: {
					user: "0c92b23b4dfecd",
					pass: "bf00df94b9ec83",
				},
			});

			const mailOptions = {
				from: "admin@vms.org",
				to: `${returnedUserFromDb.email}`,
				subject: "Password reset link",
				text: "",
				html: `Hey ${returnedUserFromDb.name} !!<br><br> <button><a href="localhost:3000/user/reset/${returnedUserFromDb.email}/${token}">Click Here to reset your password</a></button><br><br>This is one time use link and is valid only for 1 hour.`,
			};

			transporter
				.sendMail(mailOptions)
				.then((info) => {
					console.log("Email Sent " + info.response);
				})
				.catch((err) => {
					console.log(err);
				});
			res.render("./user/login", { success: "Reset link has been sent to your email!", error: "" });
		})

		.catch((err) => {
			res.render("./user/register", { error: "This email is not registered" });
		});
});

router.get("/user/reset/:id/:token", function (req, res) {
	Residents.findOne({ email: req.params.id })
		.then((returnedUserFromDb) => {
			jwt.verify(req.params.token, returnedUserFromDb.password, function (err, decoded) {
				if (err) {
					console.log(err);
				} else {
					res.render("./user/reset-new", { email: returnedUserFromDb.email, error: "" });
				}
			});
		})
		.catch(() => {
			res.render("./user/login", { error: "Please try again", success: "" });
		});
});

router.post("/user/reset-new/:id", function (req, res) {
	if (req.body.reset.password === req.body.reset.confirmPassword) {
		bcrypt
			.genSalt(10)
			.then((salt) => {
				return bcrypt.hash(req.body.reset.password, salt);
			})
			.then((hash) => {
				return Residents.findOneAndUpdate({ email: req.params.id }, { password: hash }, { useFindAndModify: false });
			})
			.then((returnedUserFromDb) => {
				res.render("./user/login", { success: "Password Updated !! Login Now", error: "" });
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.render("./user/reset-new", { email: req.params.id, error: "Both passwords must match" });
	}
});

router.get("/user/logout", function (req, res) {
	req.session.destroy(); // works better, destroys the session
	// req.session.userId = ""; does not destroys the session
	res.redirect("/user/login");
});

router.get("*", redirectLogin, function (req, res) {
	res.send("404 Page Not Found");
});

module.exports = router;
