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

async function execute(query, fundtype, fund) {
	if (!connection)
		return "no connection";
	try {
		let result;
		if (query == "value" || query == "y/y") {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("select date_measured, avg(nav_per_share) from mfund_measurement group by date_measured");
				else if (fundtype == "etf")
					result = await connection.execute("select date_measured, avg(adj_close) from etf_measurement group by date_measured");
				else
					return null;
			}
			else if (fundtype == "mutual fund")
				result = await connection.execute("select date_measured, max(nav_per_share) from mfund_measurement where symbol = " + fund + " group by date_measured");
			else if (fundtype == "etf")
				result = await connection.execute("select date_measured, max(adj_close) from etf_measurement where symbol = " + fund + " group by date_measured");
			else
				return null;
		}
		else {
			if (fund == "all") {
				if (fundtype == "mutual fund")
					result = await connection.execute("select date_mearued, avg(" + query + ") from mfund_measurement group by date_measured");
				else if (fundtype == "etf")
					result = await connection.execute("select date_measured, avg(" + query + ") from etf_measurement group by date_measured");
				else
					return null;
			}
			else if (fundtype == "mutual fund")
				result = await connection.execute("select date_measured, max(" + query + ") from mfund_measurement where symbol = " + fund + " group by date_measured");
			else if (fundtype == "etf")
				result = await connection.execute("select date_measured, max(" + query + ") from etf_measurement where symbol = " + fund + " group by date_measured");
			else
				return null;
		}
		/*
		if (query == "y/y") {
			//modify result to a comparison of 2020 with 2021
			result.metadata = ["date", "2020 value", "2021 value"];
			let rows;
			if (fundtype == "mutual fund") {
				for (row in result.rows) {
					//result.rows[row] is a tuple represented by an array of values
					let date = result.rows[row][0].toString().split(" ");
					//date[1] is month, date[2] is day, date[3] is year
					if (date[3] == "2020") {
						let tuple = new Array(3);
						tuple[0] = date[2] + " " + date[1]; //might change this to something other than a string later
						tuple[1] = result.rows[row][1];
					}
				}
			}
		}
		*/
		return result;
	} catch (err) {
		console.error(err);
		return "error";
	}
}

module.exports.test = test;
module.exports.execute = execute;