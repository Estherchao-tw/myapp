// models/registerModel.js
const db = require("../utils/shopdb");
const MemberUpdate = class MemberUpdate {

  constructor(userid, date, name, passwordkey, img, img_name, create_date) {
    this.userid = userid;
    this.date = date;
    this.name = name;
    this.passwordkey = passwordkey;
    this.img = img;
    this.img_name = img_name;
    this.create_date = create_date;
  }


  static async updateAction(id, memberUpdateData) {
    let checkUpdate = {};
    let result = {};
    const sql = "UPDATE users SET ? WHERE userid = ?";

    //新增註冊資料
    await db.query(sql, [memberUpdateData, id], function (err, rows) {
      if (err) {
        console.log(err);
        checkUpdate = "會員資料更新失敗。"
        result = { code: 1, checkUpdate: checkUpdate };
      }})
      .then(([rows,err]) => {
        if (err) throw err;
        checkUpdate = "會員資料更新成功。"
        result = { code: 0, checkUpdate: checkUpdate };
      })
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
module.exports = MemberUpdate;