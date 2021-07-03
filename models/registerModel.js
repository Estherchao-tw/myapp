// models/usersModel.js
const db = require("../utils/shopdb");
const UsersTest = class UsersTest {

  constructor(userid, date, name, passwordkey, img, img_name, create_date) {
    this.userid = userid;
    this.date = date;
    this.name = name;
    this.passwordkey = passwordkey;
    this.img = img;
    this.img_name = img_name;
    this.create_date = create_date;
  }


  static async register(memberData) {
    let result ={};
    await db.query("INSERT INTO users SET ?",memberData, function (err,rows) {
        if (err) {
          console.log(err);
          //result.status = "註冊失敗!",
          //result.err = "伺服器錯誤，請稍後再試!!"
          //reject(result);
         
        }
        result.registerMenber = memberData;
        resolve(result);
      });
    }
  };

  
// Testing
// const test = async function (req, res) {
//   await Users.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();
module.exports = UsersTest;