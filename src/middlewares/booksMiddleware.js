const { connectToDb, getDb } = require("../database/dbConfig");
const { ObjectId } = require("mongodb");

/** Setup database connection */
let DB;

connectToDb((err) => {
	if (!err) {
		DB = getDb();
	} else {
		console.log(err);
	}
});

/**
 * Export middlewares form here
 */

module.exports = {
	checkBookId: async (req, res, next) => {
		let bookId = req.params.id;
		let docId;

		try {
			const response = await DB.collection("books").findOne({
				_id: ObjectId(bookId),
			});
			docId = response._id;
		} catch (error) {
			console.log(
				"🚀 ~ file: booksMiddleware.js ~ line 30 ~ checkBookId: ~ error",
				error
			);
		}
		if (!docId) {
			res.status(404).json({ info: "Book not found" });
		} else {
			next();
		}
	},

	checkBody: (req, res, next) => {
		let body = req.body;
		if (!body || Object.keys(body).length === 0) {
			return res
				.status(400)
				.json({ info: "Bad request", details: "Body cannot be null or empty" });
		} else {
			next();
		}
	},

	bookAlreadyExists: async (req, res, next) => {
		let title = req.body.title;
		var query = { title: title };
		let findOne = "";
		try {
			const response = await DB.collection("books").findOne(query);
			findOne = response.title;
		} catch (error) {
			console.log(
				"🚀 ~ file: booksMiddleware.js ~ line 61 ~ bookAlreadyExists: ~ error",
				error
			);
		}
		if (findOne === title) {
			return res
				.status(400)
				.json({ info: "Bad request", details: "Book already exists" });
		} else {
			next();
		}
	},
};
