let express = require("express");
let getConn = require("./connection.js").getConn;
let runQuery = require("./connection.js").runQuery;

let port = process.env.PORT || 3001;
let app = express();

function formSQL(query, fundtype, fund, startDate = null, endDate = null) {
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
			sql = "select date_measured, max(nav_per_share) from mfund_measurement where symbol = '" + fund + "' group by date_measured";
		else if (fundtype == "etf")
			sql = "select date_measured, max(adj_close) from etf_measurement where symbol = '" + fund + "' group by date_measured";
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
			sql = "select date_measured, max(" + query + ") from mfund_measurement where symbol = '" + fund + "' group by date_measured";
		else if (fundtype == "etf")
			sql = "select date_measured, max(" + query + ") from etf_measurement where symbol = '" + fund + "' group by date_measured";
		else
			return null;
	}
	if (startDate)
		sql += " having date_measured >= '" + startDate + "'";
	if (endDate)
		sql += " and date_measured <= '" + endDate + "'";
	return sql;
}

function calculateYear(result) {
	//modify result to a comparison of 2020 with 2021
	result.metadata = ["date", "2020 value", "2021 value"];
	let rows = new Array(365);
	rows.fill(new Array(3));
	for (row in result.rows) {
		//result.rows[row] is a tuple represented by an array of values
		let date = result.rows[row][0].toString().split(" ");
		//date[1] is month, date[2] is day, date[3] is year
		if (date[3] != "2020" && date[3] != "2021")
			continue;
		let dateIndex;
		if (date[1] == "Jan")
			dateIndex = parseInt(date[2]) - 1;
		else if (date[1] == "Feb")
			dateIndex = parseInt(date[2]) + 30;
		else if (date[1] == "Mar")
			dateIndex = parseInt(date[2]) + 58;
		else if (date[1] == "Apr")
			dateIndex = parseInt(date[2]) + 89;
		else if (date[1] == "May")
			dateIndex = parseInt(date[2]) + 119;
		else if (date[1] == "Jun")
			dateIndex = parseInt(date[2]) + 150;
		else if (date[1] == "Jul")
			dateIndex = parseInt(date[2]) + 180;
		else if (date[1] == "Aug")
			dateIndex = parseInt(date[2]) + 211;
		else if (date[1] == "Sep")
			dateIndex = parseInt(date[2]) + 242;
		else if (date[1] == "Oct")
			dateIndex = parseInt(date[2]) + 272;
		else if (date[1] == "Nov")
			dateIndex = parseInt(date[2]) + 303;
		else
			dateIndex = parseInt(date[2]) + 333;
		if (date[3] == "2020") {
			rows[dateIndex][0] = date[2] + " " + date[1]; //might change this to something other than a string later
			rows[dateIndex][1] = result.rows[row][1];
		}
		else if (date[3] == "2021")
			rows[dateIndex][2] = result.rows[row][1];
	}
	result.rows = rows;
	return result;
}

function reformat(result) {
	let tuples = new Array(result.rows.length);
	for (index = 0; index < tuples.length; index++) {
		let date = result.rows[index][0].toString().split(" ").slice(0, 4);
		tuples[index] = {
			date: date[0] + " " + date[2] + " " + date[1] + " " + date[3],
			measurement: result.rows[index][1]
		};
	}
	return {
		count: tuples.length,
		tuples: tuples
	};
}

async function sendData(request, response) {
	let connection = await getConn();
	let sql = formSQL("value", "etf", "all");
	let result = await runQuery(connection, sql);
	//if ("value" == "y/y")
		//result = calculateYear(result);
	response.json(reformat(result));
}

app.get("/api", (request, response) => {
	sendData(request, response);
});
app.listen(port, () => {
	console.log("server listening on " + port);
});