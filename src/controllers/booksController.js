const bookService = require("../services/bookService");

module.exports = {
	getBooks: (req, res) => {
		try {
			bookService.getBooks(res);
		} catch (error) {
			console.error(error);
		}
	},

	getBookById: (req, res) => {
		let bookId = req.params.id;
		try {
			bookService.getBooksById(bookId, res);
		} catch (error) {
			console.error(error);
		}
	},

	create: (req, res) => {
		const book = req.body;
		try {
			bookService.createBook(book, res);
		} catch (error) {
			console.log("🚀 ~ file: booksController.js ~ line 17 ~ error", error);
		}
	},

	update: (req, res) => {
		let bookId = req.params.id;
		let body = req.body;
		try {
			bookService.updateBook(bookId, body, res);
		} catch (error) {
			console.log("🚀 ~ file: booksController.js ~ line 36 ~ error", error);
		}
	},

	delete: (req, res) => {
		let bookId = req.params.id;
		try {
			bookService.deleteBook(bookId, res);
		} catch (error) {
			console.log("🚀 ~ file: booksController.js ~ line 45 ~ error", error);
		}
	},
};
