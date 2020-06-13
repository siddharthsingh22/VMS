const mongoose = require("mongoose"),
	Dom_helps = require("./models/dom_help"),
	Residents = require("./models/resident");

const seedDb = () => {
	Residents.deleteMany({})
		.then(() => {
			return Residents.create({
				name: "Siddharth Pratap Singh",
				email: "siddharthpratapsingh21@gmail.com",
				phoneNo: 9889050412,
				password: "$2a$10$wjpO.DeKewaaMhNgT1WMnOpFo08ixXkr57HK/yOOhojj2SYftQ.ue",
			});
		})
		.then((returnedResidentFromDb) => {
			console.log("Added Resident Account");
		})

		.catch((err) => {
			console.log(err);
		});

	Dom_helps.deleteMany({})

		.then(() => {
			return Dom_helps.create(
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 1",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 2",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 3",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 4",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 5",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 6",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 7",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 8",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 9",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				},
				{
					id: Math.floor(100000 + 900000 * Math.random()),
					name: "Help 10",
					aadharNo: "12341234",
					address: "Taj Mahal, Agra",
					image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
					phoneNo: "1001001001",
					timeStamps: [
						{
							date: "June 12",
							checkIn: "7:10 am",
							checkOut: "2:30 pm",
						},
						{
							date: "June 11",
							checkIn: "8 am",
							checkOut: "5 pm",
						},
						{
							date: "June 10",
							checkIn: "7 am",
							checkOut: "3pm",
						},
					],
				}
			);
		})
		.then(() => {
			console.log("added dom_help accounts");
		})
		.catch((err) => {
			console.log(err);
		});

	// Dom_helps.find()
	// 	.then((returnedDom_HelpFromDb) => {
	// 		returnedDom_HelpFromDb.timeStamps.push(
	// 			{
	// 				date: "June 11",
	// 				checkIn: "7:10 am",
	// 				checkOut: "2:30 pm",
	// 			},
	// 			{
	// 				date: "June 10",
	// 				checkIn: "8 am",
	// 				checkOut: "5 pm",
	// 			},
	// 			{
	// 				date: "June 12",
	// 				checkIn: "7 am",
	// 				checkOut: "3pm",
	// 			}
	// 		);
	// 		return returnedDom_HelpFromDb.save();
	// 	})
	// 	.then(() => {
	// 		console.log("Added timestamps in each dom_help account");
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

module.exports = seedDb;
