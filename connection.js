const oracle = require('oracledb');

async function test(directory, user, pw) {
	oracle.initOracleClient({libDir: directory + "..\\instantclient-basiclite-nt-21.3.0.0.0\\instantclient_21_3"});
	if (typeof user != "string" || typeof pw != "string") {
		console.log("both inputs must be strings");
		return;
	}
	try {
		let connection = await oracle.getConnection({user: user, password: pw, connectionString: "oracle.cise.ufl.edu:1521/orcl"});
		let result = await connection.execute("select Name, Area from Continent", [], {maxRows: 5});
		return result;
	} catch (err) {
		console.error(err);
	}
}

async function init(user, pw) {
	oracle.initOracleClient({libDir: __dirname + "\\..\\instantclient-basiclite-nt-21.3.0.0.0\\instantclient_21_3"});
	if (typeof user != "string" || typeof pw != "string") {
		console.log("both inputs must be strings");
		return;
	}
	try {
		let connection = await oracle.getConnection({user: user, password: pw, connectionString: "oracle.cise.ufl.edu:1521/orcl"});
		return connection;
	} catch (err) {
		console.error(err);
	}
}

async function execute(connection, query, fundtype, fund) {
	try {
		let result;
		if (query == "value") {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("select price_date, sum(nav_per_share) from MutualFundPrices group by price_date");
				else if (fundtype == "etf")
					result = await connection.execute("select price_date, sum(adj_close) from ETFPrices group by price_date");
				else
					return null;
			}
			else if (fundtype == "mutual fund")
				result = await connection.execute("select price_date, sum(nav_per_share) from MutualFundPrices where fund_symbol = " + fund + " group by price_date");
			else if (fundtype == "etf")
				result = await connection.execute("select price_date, sum(adj_close) from ETFPrices where fund_symbol = " + fund + " group by price_date");
			else
				return null;
		}
		/* else if (query == "y/y") {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("
			}
		} */
		else
			return null;
		return result;
	} catch (err) {
		console.error(err);
	}
}

module.exports.test = test;
module.exports.init = init;
module.exports.execute = execute;