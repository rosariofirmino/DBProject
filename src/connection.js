let oracle = require("oracledb");

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

let connection = null;
try {
	oracle.initOracleClient({libDir: __dirname + "\\..\\instantclient-basiclite-nt-21.3.0.0.0\\instantclient_21_3"});
	connection = oracle.getConnection({user: "avaudreuil", password: "QKgSRkW9KgCE79AOGU61omqA", connectionString: "oracle.cise.ufl.edu:1521/orcl"});
} catch (err) {
	console.error(err);
}

async function execute(query, fundtype, fund) {
	if (!connection)
		return "no connection";
	try {
		let result;
		if (query == "value") {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("select date_measured, avg(nav_per_share) from mfund_measurement group by date_measured;");
				else if (fundtype == "etf")
					result = await connection.execute("select date_measured, avg(adj_close) from etf_measurement group by date_measured;");
				else
					return null;
			}
			else if (fundtype == "mutual fund")
				result = await connection.execute("select date_measured, max(nav_per_share) from mfund_measurement where symbol = " + fund + " group by date_measured;");
			else if (fundtype == "etf")
				result = await connection.execute("select date_measured, max(adj_close) from etf_measurement where symbol = " + fund + " group by date_measured;");
			else
				return null;
		}
		else {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("select date_mearued, avg(" + query + ") from mfund_measurement group by date_measured;");
				else if (fundtype == "etf")
					result = await connection.execute("select date_measured, avg(" + query + ") from etf_measurement group by date_measured;");
				else
					return null;
			}
			else if (fundtype == "mutual fund")
				result = await connection.execute("select date_measured, max(" + query + ") from mfund_measurement where symbol = " + fund + " group by date_measured;");
			else if (fundtype == "etf")
				result = await connection.execute("select date_measured, max(" + query + ") from etf_measurement where symbol = " + fund + " group by date_measured;");
			else
				return null;
		}
		return result;
	} catch (err) {
		console.error(err);
		return "error";
	}
}

module.exports.test = test;
module.exports.execute = execute;