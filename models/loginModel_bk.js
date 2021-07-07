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
  //判斷信箱與密碼正確性

  static async login(memberData) {
    let result = {};
    var i ;
    var result_e
    var result_p;
    var check_e = "success";
    var check_p = "success";
    
    const sql ="SELECT email,passwordkey FROM users";
    await db.query(sql, memberData.email)
    .then(([rows,err]) => {
      if (err) { result = { code: 1, checkLogin: check_e };};
      for (i=0 ;i<= rows.length; i++) {
        switch (rows[i].email) {
          case memberData.email:
            console.log(i);
            break;
            default:
              console.log("ema",rows[i].email, memberData.email);
              check_e = "查無此 email，請重新確認，謝謝!!";
              result = { code: 1, checkLogin: check_e};
            }
          result_p = rows[i].passwordkey;
            switch (result_p) {
          case memberData.passwordkey:
            break;
          default:
            console.log("pw",rows[i].passwordkey, memberData.passwordkey);

            check_p = "密碼錯誤，請重新確認，謝謝。";
            result = { code: 1, checkLogin: check_p };
        }
       }
      }, (error) => {
        console.log(error);
        result = { code: -1 };

      });
      return result;
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