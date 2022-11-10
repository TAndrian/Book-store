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

module.exports = {
	/** CRUD OPERATION FOR BOOKS */
	/**
	 *
	 * @param {Book} book
	 * @param {Http:response} res
	 */
	createBook: (book, res) => {
		try {
			DB.collection("books")
				.insertOne(book)
				.then((result) => {
					res.status(201).json({ book: result });
				});
		} catch (error) {
			res.status(500).json({ error: "Something went wrong" });
		}
	},

	/**
	 *
	 * @param {Http:response} res
	 * return collection of books
	 */
	getBooks: async (res) => {
		try {
			let books = await DB.collection("books").find({}).toArray();
			res.status(200).json({ books: books });
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 *
	 * @param {Object<ObjectId<String>>} bookId
	 * @param {Http:response} res
	 * return a specific book based on bookId
	 */
	getBooksById: (bookId, res) => {
		try {
			DB.collection("books")
				.findOne({ _id: ObjectId(bookId) })
				.then((doc) => {
					res.status(200).json({ book: doc });
				});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 *
	 * @param {Object<ObjectId<String>>} bookId
	 * @param {Book} book
	 * @param {Http:response} res
	 *  Update a book
	 */
	updateBook: (bookId, book, res) => {
		try {
			DB.collection("books")
				.updateOne({ _id: ObjectId(bookId) }, { $set: book })
				.then((result) => {
					res.status(200).json({ updated: result });
				});
		} catch (error) {
			console.log("🚀 ~ file: bookService.js ~ line 71 ~ error", error);
		}
	},

	/**
	 *
	 * @param {Object<ObjectId<String>>} bookId
	 * @param {Http:response} res
	 */
	deleteBook: (bookId, res) => {
		try {
			DB.collection("books")
				.deleteOne({ _id: ObjectId(bookId) })
				.then((result) => {
					res.status(200).json({ updated: result });
				});
		} catch (error) {
			console.log("🚀 ~ file: bookService.js ~ line 101 ~ error", error);
		}
	},
};
