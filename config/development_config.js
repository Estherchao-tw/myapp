const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


module.exports = {
  mysql: {
    host: process.env["DB_HOST"],
    port: process.env["DB_PORT"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASS"],
    database: process.env["DB"],
    dateStrings: process.env["DB_DATESTRINGS"],
  }
}
//console.log(require('dotenv').config())
// console.log(process.env["DB_HOST"]); //DB_HOST
// console.log(process.env["DB_PORT"]); //DB_PORT
// console.log(process.env["DB_USER"]); //DB_USER
// console.log(process.env["DB_PASS"]); //DB_PASS
console.log(process.env["DB"]); 
console.log(process.env["DB_DATESTRINGS"]); //DATE