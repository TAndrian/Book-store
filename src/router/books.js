const router = require("express").Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.booksController.getBooks);
router.get("/:id", booksController.booksController.getBookById);
router.post("/create", booksController.booksController.create);
router.patch("/update/:id", booksController.booksController.update);
router.delete("/delete/:id", booksController.booksController.delete);

module.exports = { path: "/api/books", router };
