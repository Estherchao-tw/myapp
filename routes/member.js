//routes/member.js

var express = require("express");
var router = express.Router();
const modifyController = require("../controllers/modifyController");
 router.get("/", function(req, res, next) {
 res.render("member");
 });

 router.post("/",modifyController.getUsers)
module.exports = router;