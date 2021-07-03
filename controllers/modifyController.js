// controllers/usersController.js
const UsersTest = require("../models/registerModel");
const Check = require('../service/member_check');

exports.getUsers = async (req, res, next) => {
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
