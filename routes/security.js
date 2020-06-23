const Visitors = require("../models/visitor");

const express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	moment = require("moment"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	Securities = require("../models/security"),
	Dom_helps = require("../models/dom_help");

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
	res.render("./security/home", { error: "", success: "", error2: "", success2: "" });
});

router.post("/security/dom_help", function (req, res) {
	if (req.body.radio1 === "checkIn") {
		Dom_helps.findOne({ id: req.body.dom_helpId })
			.then((returnedDom_helpDataFromDb) => {
				const len = returnedDom_helpDataFromDb.timeStamps.length;
				if (len !== 0 && !returnedDom_helpDataFromDb.timeStamps[len - 1].checkOut) {
					res.render("./security/home", { success: "", error: "Domestic Help has already checked-in. Check-out before trying to check-in again.", error2: "", success2: "" });
				} else {
					const today = moment();
					console.log(returnedDom_helpDataFromDb);
					returnedDom_helpDataFromDb.timeStamps.push({
						date: today.format("dddd Do MMMM, YYYY"),
						checkIn: today.format("hh:mm:ss A"),
					});
					returnedDom_helpDataFromDb
						.save()
						.then((updatedDom_helpDataFromDb) => {
							res.render("./security/home", {
								success: `Checked In !! Click Here to view ${updatedDom_helpDataFromDb.name}'s profile`,
								error: "",
								id: updatedDom_helpDataFromDb.id,
								error2: "",
								success2: "",
							});
						})
						.catch((err) => {
							res.render("./security/home", { success: "", error: "Please try again.", error2: "", success2: "" });
							console.log(err);
						});
				}
			})
			.catch((err) => {
				console.log(err);
				res.render("./security/home", { success: "", error: "Domestic help not registered.", error2: "", success2: "" });
			});
	}
	if (req.body.radio1 === "checkOut") {
		Dom_helps.findOne({ id: req.body.dom_helpId })
			.then((returnedDom_helpDataFromDb) => {
				const len = returnedDom_helpDataFromDb.timeStamps.length;
				if (!returnedDom_helpDataFromDb.timeStamps[len - 1].checkOut) {
					const today = moment();
					returnedDom_helpDataFromDb.timeStamps[len - 1].checkOut = today.format("hh:mm:ss A");
					returnedDom_helpDataFromDb
						.save()
						.then(() => {
							res.render("./security/home", {
								success: `Checked Out !! Click Here to view ${returnedDom_helpDataFromDb.name}'s profile`,
								error: "",
								id: returnedDom_helpDataFromDb.id,
								error2: "",
								success2: "",
							});
						})
						.catch((err) => {
							res.render("./security/home", { success: "", error: "Please try again.", error2: "", success2: "" });
							console.log(err);
						});
				} else {
					res.render("./security/home", { success: "", error: "Please check-in before trying to check-out.", error2: "", success2: "" });
				}
			})
			.catch((err) => {
				res.render("./security/home", { success: "", error: "Domestic help not registered.", error2: "", success2: "" });
			});
	}
});

router.get("/security/dom_help/show/:id", function (req, res) {
	Dom_helps.findOne({ id: req.params.id })
		.then((returnedDom_HelpDataFromDb) => {
			res.render("./security/show", { returnedDom_HelpDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/security/visitor", function (req, res) {
	if (req.body.radio2 === "checkIn") {
		Visitors.findOne({ aadharId: req.body.visitorAadharId })
			.then((returnedVisitorFromDb) => {
				if (!returnedVisitorFromDb.isBlacklisted) {
					returnedVisitorFromDb.visitingRecordArray.forEach((eachVisitingRecord) => {
						if (!eachVisitingRecord.actualArrival) {
							if (eachVisitingRecord.otp === parseInt(req.body.visitorOtp)) {
								eachVisitingRecord.actualArrival = moment().format("YYYY-MM-DD, HH:mm");
								const arrivalTime = eachVisitingRecord.expecArrival;
								returnedVisitorFromDb
									.save()
									.then(() => {
										res.render("./security/home", { error: "", success: "", error2: "", success2: `Done! Good to go. Expected arrival time is ${arrivalTime}` });
									})
									.catch((err) => {
										console.log(err);
										res.render("./security/home", { error: "", success: "", error2: "Please try again.", success2: "" });
									});
							}
						} else {
							res.render("./security/home", { error: "", success: "", error2: "OTP Invalid", success2: "" });
						}
					});
				} else {
					res.render("./security/home", { success: "", error: "", success2: "", error2: "VISITOR IS BLACKLISTED. CONTACT ADMIN." });
				}
			})
			.catch((err) => {
				res.render("./security/home", { error: "", success: "", error2: "Visitor Record doesn't exist.", success2: "" });
			});
	}
	if (req.body.radio2 === "checkOut") {
		Visitors.findOne({ aadharId: req.body.visitorAadharId })
			.then((returnedVisitorFromDb) => {
				returnedVisitorFromDb.visitingRecordArray.forEach((eachVisitingRecord) => {
					if (!eachVisitingRecord.actualDeparture && eachVisitingRecord.actualArrival) {
						if (eachVisitingRecord.otp === parseInt(req.body.visitorOtp)) {
							eachVisitingRecord.actualDeparture = moment().format("YYYY-MM-DD, HH:mm");
							const departureTime = eachVisitingRecord.expecDeparture;
							returnedVisitorFromDb
								.save()
								.then((returnedVisitorFromDb) => {
									res.render("./security/home", { error: "", success: "", error2: "", success2: `Done! Good to go. Expected departure time is ${departureTime}` });
								})
								.catch((err) => {
									res.render("./security/home", { error: "", success: "", error2: "Please try again.", success2: "" });
								});
						}
					} else {
						res.render("./security/home", { error: "", success: "", error2: "OTP Invalid", success2: "" });
					}
				});
			})
			.catch((err) => {
				res.render("./security/home", { error: "", success: "", error2: "Visitor Record doesn't exist.", success2: "" });
			});
	}
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
