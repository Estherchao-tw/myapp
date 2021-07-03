// models/usersModel.js
const db = require("../utils/shopdb");
const MemberLogin = class MemberLogin {

  constructor(userid, date, name, passwordkey, img, img_name, create_date) {
    this.userid = userid;
    this.date = date;
    this.name = name;
    this.passwordkey = passwordkey;
    this.img = img;
    this.img_name = img_name;
    this.create_date = create_date;
  }

  static async login(memberData) {
    let result = {};
    await db.query("SELECT * FROM users WHERE email = ? AND passwordkey = ?",memberData, function (err,rows) {
      if(err) {
        result.status = "登入失敗"
        result.err = "伺服器錯誤，請稍後再試!!"
        console.log(err);
      }
      console.log(rows);
    })
  }

  };

  
// Testing
// const test = async function (req, res) {
//   await Users.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();
module.exports = MemberLogin;