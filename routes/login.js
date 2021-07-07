var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login' ); });
router.post("/", loginController.getLogin);
module.exports = router;