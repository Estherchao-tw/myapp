// controllers/modifyController.js
const { validationResult } = require('express-validator');
const Register = require("../models/registerModel");
const MemberLogin = require("../models/loginModel");
const MemberUpdate = require("../models/updateModel");
const verify = require("../models/varification");
const check = require("../service/member_check");
var formidable = require('formidable');
const fs = require('fs');
const encryption = require('../models/encryption');
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

  //密碼加密
  //client data
  const memberData = {
    name: req.body.username,
    email: req.body.email,
    passwordkey: encryption(req.body.password),

  }
  console.log(memberData);
  //email 是否註冊過

    
  //寫入資料庫

  Register.register(memberData).then((rows,err,result) => {
    if (err) {
      console.log(err);
      res.render('register', { identify: rows});
    } else if (rows.check_E != "pass") {
      res.status(422).json({
        errorMessages: rows.check_E,
      });
    
    } else if (rows.check_E == "pass") {
      
      //res.redirect('/');
      res.redirect('/login');
    }
    return;

  });
    
};

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
      res.status(200).json({
        result: {
          status: '登入成功',
          loginMember: "歡迎 登入",
          token: rows.token
          
        }
      })
      // res.redirect('/');
      // res.redirect('/login');
    
    }
    return;

  });
};



exports.getmember = async(req,res,next) => {
  //從header找token
  const token = req.headers['x-access-token'];
  if (token){
    //判斷token
    verify(token).then(tokenResult => {
      if (tokenResult === false) {
        res.status(422).json({ errorMessages: "token錯誤。", err: "請重新登入。" });
      } else {
        // res.json({ test: "token正確" })
        const id = tokenResult;
        //密碼加密
        //client data
        const memberUpdateData = {
          name: req.body.name,
          passwordkey: encryption(req.body.password),
        }

        console.log(memberUpdateData);

        MemberUpdate.updateAction(id,memberUpdateData).then((rows,err,result) => {
          if (err) throw err;
          else res.json({ msg: rows.checkUpdate})
        } )
      }
    })
  } else {
    res.status(403).send({ message: 'token錯誤。'})
  }
};


exports.putUpdateImage = (req, res, next) => {
  var form = new formidable.IncomingForm();
  const token = req.headers['x-access-token'];
  if (token) {
    //判斷token
    verify(token).then(tokenResult => {
      if (tokenResult === false) {
        res.status(422).json({ errorMessages: "token錯誤。", err: "請重新登入。" });
      } else {
        // res.json({ test: "token正確" })
        form.parse(req, async function (name, fields, files) {
          // console.log(fields, files);
          // console.log('Uploaded ' + files.file.name);
          // console.log('Uploaded ' + files.file.type);
          if (check.checkFileSize(files.file.size) === true) {
            res.json({ message: "上傳檔案失敗", error: "請上傳小於1MB的檔案" })
          }
          if (check.checkFileType(files.file.type) === true) {

            const image = await fileToBase64(files.file.path);


            const id = tokenResult;
            const password = encryption(fields.password);
            //密碼加密
            //client data
            const memberUpdateData = {
              name: fields.name,
              passwordkey: password,
              img: image
            }

            console.log(memberUpdateData);

            MemberUpdate.updateAction(id, memberUpdateData).then((rows, err, result) => {
              if (err) throw err;
              else res.json({ msg: rows.checkUpdate })
            })

          } else { res.json({ message: "上傳檔案失敗", error: "請選正確檔案格式。" }) }
          return;
        });



      }
    })
  } else {
    res.status(403).send({ message: 'token錯誤。' })
  }

  const fileToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'base64', function (err, data) {
        resolve(data);
      })
    })
  }
  };