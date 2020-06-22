const { ReplSet } = require("mongodb");

const express = require("express"),
	router = express.Router(),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	Admins = require("../models/admin"),
	Securities = require("../models/security"),
	Dom_helps = require("../models/dom_help"),
	Visitors = require("../models/visitor"),
	mongoose = require("mongoose");

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
	if (req.session.adminId) {
		next();
	} else {
		res.render("./admin/login", { success: "", error: "" });
	}
};

const redirectAdmin = (req, res, next) => {
	if (!req.session.adminId) {
		next();
	} else {
		res.redirect("/admin");
	}
};

// =================================
// Admin Routes
// =================================

router.get("/admin", redirectLogin, function (req, res) {
	res.render("./admin/home");
});

router.get("/admin/dom_help", function (req, res) {
	Dom_helps.find()
		.then((returnedDom_helpDataFromDb) => {
			res.render("./admin/dom_help/home", { returnedDom_helpDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/dom_help/show/:id", function (req, res) {
	Dom_helps.findOne({ id: req.params.id })
		.then((returnedDom_helpDataFromDb) => {
			res.render("./admin/dom_help/show", { returnedDom_helpDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/dom_help/delete/:id", function (req, res) {
	Dom_helps.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect("/admin/dom_help");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/admin/dom_help");
		});
});

router.get("/admin/dom_help/new", function (req, res) {
	res.render("./admin/dom_help/new");
});

router.post("/admin/dom_help", function (req, res) {
	const cover = JSON.parse(req.body.cover);
	Dom_helps.create({
		name: req.body.new.name,
		aadharNo: req.body.new.aadharNo,
		address: req.body.new.address,
		phoneNo: req.body.new.phoneNo,
		id: Math.floor(100000 + 900000 * Math.random()),
		image: new Buffer.from(cover.data, "base64"),
		imageType: cover.type,
	})
		.then((savedDom_helpInDb) => {
			res.render("./admin/dom_help/show", { returnedDom_helpDataFromDb: savedDom_helpInDb });
		})
		.catch((err) => {
			console.log(err);
			res.render("./admin/dom_help/new");
		});
});

router.get("/admin/dom_help/edit/:id", function (req, res) {
	Dom_helps.findById(req.params.id)
		.then((returnedDom_helpDataFromDb) => {
			res.render("./admin/dom_help/edit", { returnedDom_helpDataFromDb });
		})
		.catch((err) => {
			console.log(err);
			//	res.render("")
		});
});

router.post("/admin/dom_help/edit/:id", function (req, res) {
	const cover = JSON.parse(req.body.cover);

	Dom_helps.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.edit.name,
			phoneNo: req.body.edit.phoneNo,
			address: req.body.edit.address,
			aadharNo: req.body.edit.aadharNo,
			image: new Buffer.from(cover.data, "base64"),
			imageType: cover.type,
		},
		{ new: true }
	)
		.then((updatedDom_helpFromDb) => {
			res.render("./admin/dom_help/show", { returnedDom_helpDataFromDb: updatedDom_helpFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/securityPersonnel", function (req, res) {
	Securities.find()
		.then((returnedSecuritiesDataFromDb) => {
			res.render("./admin/securityPersonnel/home", { returnedSecuritiesDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/securityPersonnel/show/:id", function (req, res) {
	Securities.findById(req.params.id)
		.then((returnedSecurityDataFromDb) => {
			res.render("./admin/securityPersonnel/show", { returnedSecurityDataFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/securityPersonnel/new", function (req, res) {
	res.render("./admin/securityPersonnel/new");
});

router.post("/admin/securityPersonnel", function (req, res) {
	const cover = JSON.parse(req.body.securityImage);
	Securities.create({
		name: req.body.new.name,
		designation: req.body.new.designation,
		aadharNo: req.body.new.aadharNo,
		address: req.body.new.address,
		phoneNo: req.body.new.phoneNo,
		remarks: req.body.new.remarks,
		password: req.body.new.password,
		id: Math.floor(100000 + 900000 * Math.random()),
		image: new Buffer.from(cover.data, "base64"),
		imageType: cover.type,
	})
		.then((savedSecurityPersonnelInDb) => {
			res.render("./admin/securityPersonnel/show", { returnedSecurityDataFromDb: savedSecurityPersonnelInDb });
		})
		.catch((err) => {
			console.log(err);
			res.render("./admin/securityPersonnel/new");
		});
});

router.get("/admin/securityPersonnel/edit/:id", function (req, res) {
	Securities.findById(req.params.id)
		.then((returnedSecurityDataFromDb) => {
			res.render("./admin/securityPersonnel/edit", { returnedSecurityDataFromDb });
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/admin/securityPersonnel");
		});
});

router.post("/admin/securityPersonnel/edit/:id", function (req, res) {
	const cover = JSON.parse(req.body.securityImage);

	Securities.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.edit.name,
			designation: req.body.edit.designation,
			aadharNo: req.body.edit.aadharNo,
			address: req.body.edit.address,
			phoneNo: req.body.edit.phoneNo,
			remarks: req.body.edit.remarks,
			password: req.body.edit.password,
			image: new Buffer.from(cover.data, "base64"),
			imageType: cover.type,
		},
		{ new: true, useFindAndModify: false }
	)
		.then((updatedSecurityFromDb) => {
			res.render("./admin/securityPersonnel/show", { returnedSecurityDataFromDb: updatedSecurityFromDb });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/admin/securityPersonnel/delete/:id", function (req, res) {
	Securities.findByIdAndRemove(req.params.id, { useFindAndModify: false })
		.then(() => {
			res.redirect("/admin/securityPersonnel");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/admin/securityPersonnel");
		});
});

router.get("/admin/visitor", function (req, res) {
	Visitors.find()
		.then((returnedVisitorsDataFromDb) => {
			res.render("./admin/visitor/home", { returnedVisitorsDataFromDb });
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/admin");
		});
});

router.get("/admin/visitor/show/:id", function (req, res) {
	Visitors.findById(req.params.id)
		.then((returnedVisitorDataFromDb) => {
			res.render("./admin/visitor/show", { returnedVisitorDataFromDb });
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/admin/visitor");
		});
});

router.get("/admin/visitor/blacklist/:id", function (req, res) {
	Visitors.findById(req.params.id).then((returnedVisitorDataFromDb) => {
		const currentStatus = returnedVisitorDataFromDb.isBlacklisted;
		returnedVisitorDataFromDb.isBlacklisted = !currentStatus;
		returnedVisitorDataFromDb
			.save()
			.then(() => {
				res.redirect(`/admin/visitor/show/${returnedVisitorDataFromDb.id}`);
			})
			.catch((err) => {
				console.log(err);
				res.redirect(`/admin/visitor/show/${returnedVisitorDataFromDb.id}`);
			});
	});
});
// =================================
// AUTH Routes
// =================================

router.get("/admin/login", redirectAdmin, function (req, res) {
	res.render("./admin/login", { success: "", error: "" });
});

router.post("/admin/login", redirectAdmin, function (req, res) {
	Admins.findOne({ email: req.body.login.email })
		.then((returnedAdminFromDb) => {
			if (returnedAdminFromDb.password === req.body.login.password) {
				req.session.adminId = returnedAdminFromDb._id;
				res.redirect("/admin");
			} else {
				res.render("./admin/login", { success: "", error: "Incorrect Password" });
			}
		})
		.catch((err) => {
			res.render("./admin/login", { error: "Email not registered as admin", success: "" });
		});
});

router.get("/admin/logout", function (req, res) {
	req.session.destroy();
	res.redirect("/admin");
});

module.exports = router;
