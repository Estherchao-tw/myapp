// controllers/usersController.js
const { validationResult } = require('express-validator');
const Register = require("../models/registerModel");
const MemberLogin = require("../models/loginModel");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${value}${location}[${param}]: ${msg}`;
};


exports.getUsers = async (req, res, next) => {
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
  //email 是否註冊過

    
  //寫入資料庫

  Register.register(memberData).then((err,result) => {
    if (err) {
      console.log(err);
    }
    //res.redirect('/');
    res.redirect('/login');
  });
    
};

exports.getLogin = async (req,res,next) => {
  MemberLogin.login(memberData).then((err,result) => {
    if (err) {console.log(err);}
    console.log(memberData.email);
    res.redirect("/");
  })
};
