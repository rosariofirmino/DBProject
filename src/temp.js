let min = require("minimist");
let test = require("./connection.js");
let directory = process.argv[1];
directory = directory.slice(0, directory.length - 7);
let args = (min)(process.argv.slice(2));

test(directory, args["username"], args["pw"]).then(console.log);