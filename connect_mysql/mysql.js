var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "cdnhung",
  password: "123123123",
  database: "cdnhung"
});
module.exports = con;