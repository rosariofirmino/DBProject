let oracle = require("oracledb");

async function test(sql) {
	//oracle.initOracleClient({libDir: __dirname + "\\..\\instantclient-basiclite-nt-21.3.0.0.0\\instantclient_21_3"});
	let connection = await oracle.getConnection({user: "avaudreuil", password: "QKgSRkW9KgCE79AOGU61omqA", connectionString: "oracle.cise.ufl.edu:1521/orcl"});
	let result = await connection.execute(sql);
	return result;
}

let connection = null;
try {
	oracle.initOracleClient({libDir: __dirname + "\\..\\instantclient-basiclite-nt-21.3.0.0.0\\instantclient_21_3"});
	connection = oracle.getConnection({user: "avaudreuil", password: "QKgSRkW9KgCE79AOGU61omqA", connectionString: "oracle.cise.ufl.edu:1521/orcl"});
} catch (err) {
	console.error(err);
}

async function runQuery(sql) {
	let connection;
	if (!connection)
		connection = await oracle.getConnection({user: "avaudreuil", password: "QKgSRkW9KgCE79AOGU61omqA", connectionString: "oracle.cise.ufl.edu:1521/orcl"});
	try {
		let result = await connection.execute(sql);
		return result;
	} catch (err) {
		console.error(err);
		return "error";
	}
}

module.exports.test = test;
module.exports.runQuery = runQuery;