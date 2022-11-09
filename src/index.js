require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const { port, DEV_ENV } = require("./helpers/const");
const bookRouter = require("./router/books");

var corsOptions = {
	origin: DEV_ENV,
};

/*
    Server main entry
*/

// Setup server
const app = Express();

// Middlewares
app.use(cors(corsOptions));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Setup router
app.use(bookRouter.path, bookRouter.router);

/** Hello world */
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Mongodb tutorial listening on port ${port}`);
});
