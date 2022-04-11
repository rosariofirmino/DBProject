let fs = require("fs");
let directory = process.argv[1];
directory = directory.slice(0, directory.length - 13);
let readline = require("readline");

let inputDir = directory.slice(0, directory.length - 18) + "archive\\";
//let inputFiles = ["ETFs", "MutualFunds", "ETF prices", "MutualFund prices - A-E", "MutualFund prices - F-K", "MutualFund prices - L-P", "MutualFund prices - Q-Z"];
let outputFile = directory + "insert_tuples.sql";
let data;

/* //etf
let indices = [0, 3, 13, 18, 21, 16, 11]
try {
	data = fs.readFileSync(inputDir + "ETFs.csv", "utf8");
	data = data.split("\n");
	for (index in data) {
		let tuple = new Array();
		let quotes = false;
		let lastComma = -1;
		for (i in data[index]) {
			if (tuple.length > 21)
				break;
			if (data[index][i] == "\"")
				quotes = !quotes;
			else if (data[index][i] == "," && quotes == false) {
				tuple.push(data[index].slice(lastComma+1, i));
				lastComma = parseInt(i);
			}
		}
		data[index] = tuple;
	}
} catch (err) {
	console.error(err);
	process.kill(process.pid, "SIGTERM");
}
for (i = 1; i < data.length - 1; i++) {
	let insertion = "insert into etf values('"+data[i][indices[0]]+"', '"+data[i][indices[1]]+"'";
	for (j = 2; j < indices.length; j++) {
		if (data[i][indices[j]] != "")
			insertion += ", " + data[i][indices[j]];
		else
			insertion += ", NULL";
	}
	insertion += ");\n";
	try {
		fs.appendFileSync(outputFile, insertion);
	} catch (err) {
		console.error(err);
		process.kill(process.pid, "SIGTERM");
	}
}

//mutualfund
indices = [0, 3, 16, 17, 22, 25, 20]
try {
	data = fs.readFileSync(inputDir + "MutualFunds.csv", "utf8");
	data = data.split("\n");
	for (index in data) {
		let tuple = new Array();
		let quotes = false;
		let lastComma = -1;
		for (i in data[index]) {
			if (tuple.length > 25)
				break;
			if (data[index][i] == "\"")
				quotes = !quotes;
			else if (data[index][i] == "," && quotes == false) {
				tuple.push(data[index].slice(lastComma+1, i));
				lastComma = parseInt(i);
			}
		}
		data[index] = tuple;
	}
} catch (err) {
	console.error(err);
	process.kill(process.pid, "SIGTERM");
}
for (index = 1; index < data.length - 1; index++) {
	let insertion = "insert into mutualfund values('"+data[index][indices[0]]+"', '"+data[index][indices[1]]+"'";
	for (i = 2; i < indices.length; i++) {
		if (data[index][indices[i]] != "")
			insertion += ", " + data[index][indices[i]];
		else
			insertion += ", NULL";
	}
	insertion += ");\n";
	try {
		fs.appendFileSync(outputFile, insertion);
	} catch(err) {
		console.error(err);
		process.kill(process.pid, "SIGTERM");
	}
} */

//etf measurement
indices = [0, 1, 2, 5, 6, 3, 4, 7];
//start deleting
try {
	let data = fs.readFileSync(inputDir + "ETF prices.csv", "utf8");
	data = data.split("\n");
	for (index in data) {
		let tuple = new Array();
		let quotes = false;
		let lastComma = -1;
		for (i in data[index]) {
			if (data[index][i] == "\"")
				quotes = !quotes;
			else if ((data[index][i] == "," && quotes == false) || i + 1 == data[index].length) {
				tuple.push(data[index].slice(lastComma+1, i));
				lastComma = parseInt(i);
			}
		}
		data[index] = tuple;
	}
} catch (err) {
	console.error(err);
	process.kill(process.pid, "SIGTERM");
}
for (index = 1; index < data.length - 1; index++) {
	let insertion = "insert into etf_measurement values ('"+data[index][indices[0]]+"', date '"+data[index][indices[1]]+"'";
	for (i = 2; i < indices.length; i++) {
		if (data[index][indices[i]] == "")
			insertion += ", NULL";
		else
			insertion += ", " + data[index][indices[i]];
	}
	insertion += ");\n";
	try {
		fs.appendFileSync(outputFile, insertion);
	} catch (err) {
		console.error(err);
		process.kill(process.pid, "SIGTERM");
	}
}
//stop deleting
try {
	let write = fs.createWriteStream(outputFile);
	let rli = readline.createInterface({
		input: fs.createReadStream(inputDir + "ETF prices.csv");
	}
	