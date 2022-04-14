let express = require("express");
let test = require("./connection.js").test;

let port = process.env.PORT || 3001;
let app = express();
async function sendData(response) {
	let result = await test("select symbol from etf");
	response.json(result);
}

app.get("/api", (request, response) => {
	//response.json({message: "test"});
	sendData(response);
});
app.listen(port, () => {
	console.log("server listening on " + port);
});