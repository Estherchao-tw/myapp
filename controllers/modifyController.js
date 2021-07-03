// controllers/usersController.js
const { validationResult } = require('express-validator');
const UsersTest = require("../models/registerModel");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${value}${location}[${param}]: ${msg}`;
};


exports.getUsers = async (req, res, next) => {


  // 將註冊表單的資訊保留起來
  const { name, email, password, confirmPassword } = req.body
  // 從請求中提取所有錯誤訊息，並將回傳的 Result 物件存在 errors 變數中
  const errors = validationResult(req).formatWith(errorFormatter);
  // 如果有錯誤訊息＝驗證失敗
  if (!errors.isEmpty()) {
    // 顯示驗證失敗的代號 422，渲染註冊頁面、錯誤訊息，並保留原本的使用者輸入
    res.status(422).json({
      errorMessages: errors.array()});
      return;
    // res.status(422).render('member', {
    //   member: { name, email, password, confirmPassword },
    //   errorMessages: errors.array()});
    //   return;
  };
  //client data
  const memberData = {
    name: req.body.username,
    email: req.body.email,
    passwordkey: req.body.password,

  }
  console.log(memberData);
    
  //寫入資料庫
  UsersTest.register(memberData).then((err,result) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/member');
  });
    
};
