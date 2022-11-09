const { MongoClient } = require("mongodb");
const { BOOKSTORE_DB } = require("../helpers/const");
let dbconnection;

module.exports = {
	/** Fetch database connection */
	connectToDb: (cb) => {
		MongoClient.connect(BOOKSTORE_DB)
			.then((client) => {
				dbconnection = client.db("bookstore");
				return cb();
			})
			.catch((err) => {
				console.log(err);
				return cb(err);
			});
	},
	getDb: () => dbconnection,
	closeDb: () => dbconnection.close(),
};
