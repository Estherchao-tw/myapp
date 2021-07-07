// models/usersModel.js
const jwt = require('jsonwebtoken');
const config = require('../config/development_config');


    // static async varifyToken(token) {
    //   let tokenResult = "";
    //   const time = Math.floor(Date.now() / 1000);
    //   return new Promise((resolve,reject) => {
    //     if (token) {
    //       jwt.verify(token, config.secret, function (err, decoded) {
    //         if (err) {
    //           tokenResult = false;
    //           resolve(tokenResult);
    //           //token過期判斷
    //         } else if (decoded.exp <= time) {
    //           tokenResult = false;
    //           resolve(tokenResult);
    //         } else {
    //           tokenResult = decoded.data;
    //           resolve(tokenResult);
    //         }
    //       })
    //     }
    //   })
    //   return;
    // }



  
// Testing
// const test = async function (req, res) {
//   await Users.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();
module.exports = MemberLogin;