let express = require("express");
let test = require("./connection.js").test;

let port = process.env.PORT || 3001;
let app = express();
async function sendData(response) {
	let response = await test("select symbol from etf");
	response.json(response);
}

app.get("/api", (request, response) => {
	//response.json({message: "test"});
	test("select symbol from etf").then(response.json);
});
app.listen(port, () => {
	console.log("server listening on " + port);
});