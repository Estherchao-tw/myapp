// models/usersModel.js
const db = require(".././utils/shopdb");
const Users = class users {
  constructor(userid, date, name, passwordkey, img, img_name, create_date) {
    this.userid = userid;
    this.date = date;
    this.name = name;
    this.passwordkey = passwordkey;
    this.img = img;
    this.img_name = img_name;
    this.create_date = create_date;
  }
  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }
};
// Testing
// const test = async function (req, res) {
//   await Users.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();
module.exports = Users;