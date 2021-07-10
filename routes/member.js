var express = require("express");
var router = express.Router();
const { check } = require('express-validator');
const modifyController = require("../controllers/modifyController");

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", [
  check('username').isLength({ min: 6 })
  .withMessage('名字必填，且不能是空格。Username Must Be at Least 6 Characters')
  .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape(),
  check('password').isLength({ min: 8 })
  .withMessage('Password Must Be at Least 8 Characters')
  .matches('[0-9]').withMessage('Password Must Contain a Number')
  .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape(),
  check('confirmPassword').custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error('兩次輸入密碼不相同')
    } return true
  }),
  check('email').isEmail().trim().escape().normalizeEmail().withMessage('信箱格式錯誤')], modifyController.getUsers);
  
  router.get('/login', function (req, res, next) {
    res.render('login');
  });
  router.post("/login", modifyController.getLogin);

  router.get('/',modifyController.getmember);
  
  
  module.exports = router;