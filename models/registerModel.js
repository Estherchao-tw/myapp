// models/registerModel.js
const { check } = require("express-validator");
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
    var result_e;
    var i =0;
    var check_e="pass";
    const sql_e1 = "SELECT * FROM users";
    
    //判斷信箱重複註冊
    await db.query(sql_e1)
      .then(([rows]) => {
        // console.log(memberData.email);
        for (i=0 ;i< rows.length; i++) {
          result_e = rows[i].email;
          if (memberData.email == result_e) {
            console.log(result_e);
              check_e = "此信箱已註冊過。";
              break;
            }
          // console.log(result_e);
          }
          result = { code: 1, checkE: check_e };
        
      }, (error) => {
        console.log(error);
      });
      //新增註冊資料
    await db.query("INSERT INTO users (name,email,passwordkey) VALUES (?,?,?)", [memberData.name, memberData.email, memberData.passwordkey])
    .then(([rows]) => {
      // console.log(rows);
      result = { code:0, check_E: check_e};
    }, (error) => {
      console.log(error);
      result = {code: -1};
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
module.exports = UsersTest;