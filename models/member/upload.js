// models/usersModel.js
const db = require("../../utils/shopdb");
const Product = class Product {
  constructor(id, type, name, descr, price, quantity, img, img_name, update_date) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.descr = descr;
    this.price = price;
    this.quantity = quantity;
    this.img = img;
    this.img_name = img_name;
    this.update_date = update_date;
  }

  


  static async updatePIC(id, memberUpdateData) {
    let checkUpdate = {};
    let result = {};
    const sql = "UPDATE users SET ? WHERE userid = ?";

    //新增註冊資料
    await db.query(sql, [memberUpdateData, id], function (err, rows) {
      if (err) {
        console.log(err);
        checkUpdate = "會員資料更新失敗。"
        result = { code: 1, checkUpdate: checkUpdate };
      }
    })
      .then(([rows, err]) => {
        if (err) throw err;
        checkUpdate = "會員資料更新成功。"
        result = { code: 0, checkUpdate: checkUpdate };
      })
    return result;
  }
};
// Testing
// const test = async function (req, res) {
//   await Product.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();
module.exports = Product;