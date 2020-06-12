const mongoose = require("mongoose"),
	Residents = require("./models/resident");

const seedDb = () => {
	Residents.deleteMany({})
		.then(() => {
			return Residents.create({
				name: "Siddharth Pratap Singh",
				email: "siddharthpratapsingh21@gmail.com",
				phoneNo: 9889050412,
				password: "hey",
			});
		})
		.then((returnedResidentFromDb) => {
			console.log(returnedResidentFromDb);
		})

		.catch((err) => {
			console.log(err);
		});
};

module.exports = seedDb;
