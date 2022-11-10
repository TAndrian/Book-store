const router = require("express").Router();
const booksController = require("../controllers/booksController");
const booksMiddleware = require("../middlewares/booksMiddleware");

router.get("/", booksController.getBooks);

router.get("/:id", booksMiddleware.checkBookId, booksController.getBookById);

router.post(
	"/create",
	booksMiddleware.checkBody,
	booksMiddleware.bookAlreadyExists,
	booksController.create
);

router.patch(
	"/update/:id",
	booksMiddleware.checkBookId,
	booksMiddleware.checkBody,
	booksController.update
);

router.delete(
	"/delete/:id",
	booksMiddleware.checkBookId,
	booksController.delete
);

module.exports = { path: "/api/books", router };
