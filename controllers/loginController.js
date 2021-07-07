// controllers/loginController.js


const MemberLogin = require("../models/loginModel");
const encryption = require('../models/encryption');

exports.getLogin = async (req, res, next) => {

  //密碼加密
  //client data
  const memberData = {
    email: req.body.email,
    passwordkey: encryption(req.body.password),

  }

  MemberLogin.login(memberData).then((rows, err, result) => {
    if (err) {
      console.log(err);
      res.render('login');
    } else if (rows.checkLogin != "success") {
      res.status(422).json({
        errorMessages: rows.checkLogin,
      });

    } else if (rows.checkLogin == "success") {
      res.setHeader('token', rows.token);
      res.status(200).json({
        result: {
          status:'登入成功',
          loginMember: "歡迎 登入" ,
          token: rows.token
        }
      })
      // res.redirect('/');
      // res.redirect('/login');
    }
    return;

  });
};