let express = require("express");
let getConn = require("./connection.js").getConn;
let runQuery = require("./connection.js").runQuery;

let port = process.env.PORT || 3001;
let app = express();

function formSQL(query, fundtype, fund) {
	let sql;
	if (query == "value" || query == "y/y") {
		if (fund == "all") {
			if (fundtype == "mutual fund")
				sql = "select date_measured, avg(nav_per_share) from mfund_measurement group by date_measured";
			else if (fundtype == "etf")
				sql = "select date_measured, avg(adj_close) from etf_measurement group by date_measured";
			else
				return null;
		}
		else if (fundtype == "mutual fund")
			sql = "select date_measured, max(nav_per_share) from mfund_measurement where symbol = " + fund + " group by date_measured";
		else if (fundtype == "etf")
			sql = "select date_measured, max(adj_close) from etf_measurement where symbol = " + fund + " group by date_measured";
		else
			return null;
	}
	else {
		if (fund == "all") {
			if (fundtype == "mutual fund")
				sql = "select date_mearued, avg(" + query + ") from mfund_measurement group by date_measured";
			else if (fundtype == "etf")
				sql = "select date_measured, avg(" + query + ") from etf_measurement group by date_measured";
			else
				return null;
		}
		else if (fundtype == "mutual fund")
			sql = "select date_measured, max(" + query + ") from mfund_measurement where symbol = " + fund + " group by date_measured";
		else if (fundtype == "etf")
			sql = "select date_measured, max(" + query + ") from etf_measurement where symbol = " + fund + " group by date_measured";
		else
			return null;
	}
	return sql;
}

function calculateYear(result) {
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

async function sendData(request, response) {
	//let result = await test("select date_measured, avg(adj_close) from etf_measurement group by date_measured");
	let connection = await getConn();
	let sql = formSQL("value", "etf", "all");
	let result = await runQuery(connection, sql);
	response.json(result);
}

app.get("/api", (request, response) => {
	sendData(request, response);
});
app.listen(port, () => {
	console.log("server listening on " + port);
});