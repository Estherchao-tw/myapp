const config = require('../config/development_config');
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  dateStrings: config.mysql.dateStrings
});


// Testing database connection
// pool.query("SELECT * FROM users", function (err, results) {
//   console.log(JSON.stringify(results)); // results contains rows returned by server
//   console.log("Database blogen connected.");
// });
module.exports = pool.promise();