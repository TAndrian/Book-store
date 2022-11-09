/*
    Export constants from here
*/

const port = process.env.PORT || 3001;
const BOOKSTORE_DB = process.env.DEV_BOOKSTORE_DB || "";
const DEV_ENV = process.env.DEV_ENV || "";

module.exports = {
	port,
	BOOKSTORE_DB,
	DEV_ENV,
};
