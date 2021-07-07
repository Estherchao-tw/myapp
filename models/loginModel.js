// models/usersModel.js
const db = require("../utils/shopdb");
const jwt = require('jsonwebtoken');
const config = require('../config/development_config');

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
    
    const sql ="SELECT userid, email, passwordkey, name FROM users";
    await db.query(sql, [memberData.email], function (err, rows, fields) {
      if( err) throw err;
      console.log(rows[0])
    })
    .then(([rows,err]) => {
      if (err) { result = { code: 1, checkLogin: "查無此 email，請重新確認，謝謝!!" };};
      // console.log(rows.length);
      for (i=0 ;i< rows.length; i++) {
      if (rows[i].email == memberData.email){
        if (memberData.passwordkey == rows[i].passwordkey) {
          //token 
          const token = jwt.sign({
            algorithm:"HS256",
            exp:Math.floor(Date.now()/1000 + (60 * 60)),//valid in a hour
            data:rows[0].userid
          }, config.secret);
          result = { code: 0, checkLogin: check_p,token:token };
        } else {
          console.log("pw", rows[i].passwordkey, memberData.passwordkey);
          check_p = "密碼錯誤，請重新確認，謝謝。"
          result = { code: 1, checkLogin: check_p };
        };
       
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