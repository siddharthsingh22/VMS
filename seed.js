const mongoose = require("mongoose"),
	Dom_helps = require("./models/dom_help"),
	Visitors = require("./models/visitor"),
	Security = require("./models/security"),
	Admins = require("./models/admin"),
	Residents = require("./models/resident");
const Securities = require("./models/security");

const seedDb = () => {
	// Residents.deleteMany({})
	// 	.then(() => {
	// 		return Residents.create({
	// 			name: "Siddharth Pratap Singh",
	// 			email: "siddharthpratapsingh21@gmail.com",
	// 			phoneNo: 9889050412,
	// 			password: "$2a$10$wjpO.DeKewaaMhNgT1WMnOpFo08ixXkr57HK/yOOhojj2SYftQ.ue",
	// 			visitorsArray: [
	// 				{
	// 					visitorId: "5ee61c22e1561b090d762ef5",
	// 					visitingId: "5ee61c22e1561b090d762ef6",
	// 				},
	// 				{
	// 					visitorId: "5ee61c22e1561b090d762efb",
	// 					visitingId: "5ee61c22e1561b090d762efd",
	// 				},
	// 			],
	// 		});
	// 	})
	// 	.then((returnedResidentFromDb) => {
	// 		console.log("Added Resident Account");
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// Dom_helps.deleteMany({})
	// 	.then(() => {
	// 		return Dom_helps.create(
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 1",
	// 				aadharNo: "1234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 2",
	// 				aadharNo: "12345",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 3",
	// 				aadharNo: "2345",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 4",
	// 				aadharNo: "45673456",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 5",
	// 				aadharNo: "23452345456",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 6",
	// 				aadharNo: "111111111",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 7",
	// 				aadharNo: "1222222222",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 8",
	// 				aadharNo: "3333333333",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 9",
	// 				aadharNo: "4444444444",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 10",
	// 				aadharNo: "55555555",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						// date: "Thursday 17th June, 2020",
	// 						checkIn: "9:41:18 AM",
	// 						checkOut: "10:42:02 PM",
	// 					},
	// 				],
	// 			}
	// 		);
	// 	})
	// 	.then(() => {
	// 		console.log("added dom_help accounts");
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// Visitors.deleteMany({})
	// 	.then(() => {
	// 		return Visitors.create(
	// 			{
	// 				name: "Iron Man",
	// 				aadharId: "StarkInc@123",
	// 				visitingRecordArray: [
	// 					{
	// 						purpose: "Fun",
	// 						date: "June 14",
	// 						expecArrival: "June 14 7pm",
	// 						expecDeparture: "June 14 8pm",
	// 					},
	// 					{
	// 						purpose: "Kill Thanos",
	// 						date: "June 15",
	// 						expecArrival: "June 14 8pm",
	// 						expecDeparture: "June 14 9pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				name: "Captain America",
	// 				aadharId: "CapIsGreat@1",
	// 				visitingRecordArray: [
	// 					{
	// 						purpose: "Fun",
	// 						date: "June 14",
	// 						expecArrival: "June 14 7pm",
	// 						expecDeparture: "June 14 8pm",
	// 					},
	// 					{
	// 						purpose: "Kill Thanos",
	// 						date: "June 15",
	// 						expecArrival: "June 14 8pm",
	// 						expecDeparture: "June 14 9pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				name: "Thor",
	// 				aadharId: "Mjolnir",
	// 				visitingRecordArray: [
	// 					{
	// 						purpose: "Fun",
	// 						date: "June 14",
	// 						expecArrival: "June 14 7pm",
	// 						expecDeparture: "June 14 8pm",
	// 					},
	// 					{
	// 						purpose: "Kill Thanos",
	// 						date: "June 15",
	// 						expecArrival: "June 14 8pm",
	// 						expecDeparture: "June 14 9pm",
	// 					},
	// 				],
	// 			}
	// 		);
	// 	})
	// 	.then((returnedEntryFromDb) => {
	// 		console.log(returnedEntryFromDb);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// Securities.create({
	// 	name: "Security1",
	// 	id: "Security@1234",
	// 	password: "1234",
	// })
	// 	.then((returnedSecurityFromDb) => {
	// 		console.log(returnedSecurityFromDb);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// Admins.create({
	// 	name: "Admin One",
	// 	email: "admin@adani.com",
	// 	password: "1234",
	// })
	// 	.then((returnedAdminFromDb) => {
	// 		console.log(returnedAdminFromDb);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};

module.exports = seedDb;
