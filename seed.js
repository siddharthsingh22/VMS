const mongoose = require("mongoose"),
	Dom_helps = require("./models/dom_help"),
	Visitors = require("./models/visitor"),
	Security = require("./models/security"),
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
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 2",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 3",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 4",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 5",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 6",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 7",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 8",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 9",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: Math.floor(100000 + 900000 * Math.random()),
	// 				name: "Help 10",
	// 				aadharNo: "12341234",
	// 				address: "Taj Mahal, Agra",
	// 				image: "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561__340.png",
	// 				phoneNo: "1001001001",
	// 				timeStamps: [
	// 					{
	// 						date: "June 12",
	// 						checkIn: "7:10 am",
	// 						checkOut: "2:30 pm",
	// 					},
	// 					{
	// 						date: "June 11",
	// 						checkIn: "8 am",
	// 						checkOut: "5 pm",
	// 					},
	// 					{
	// 						date: "June 10",
	// 						checkIn: "7 am",
	// 						checkOut: "3pm",
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
	Securities.create({
		name: "Security1",
		id: "Security@1234",
		password: "1234",
	})
		.then((returnedSecurityFromDb) => {
			console.log(returnedSecurityFromDb);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = seedDb;
