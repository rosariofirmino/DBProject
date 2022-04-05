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

module.exports = test;