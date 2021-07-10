// models/usersModel.js
const jwt = require('jsonwebtoken');
const config = require('../config/development_config');


//進行token認證
module.exports = function verifyToken(token) {
    let tokenResult = "";
    const time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        //判斷token是否正確
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    tokenResult = false;
                    console.log(tokenResult, "1");
                    resolve(tokenResult);
                    //token過期判斷
                } else if (decoded.exp <= time) {
                    tokenResult = false;
                    console.log(tokenResult, "2");
                    resolve(tokenResult);
                    //若正確
                } else {
                    tokenResult = decoded.data;
                    console.log(tokenResult);
                    resolve(tokenResult);
                }
            })
        }
    });
}

  
// Testing
// const test = async function (req, res) {
//   await Users.fetchAll().then(([rows]) => {
//     console.log(JSON.stringify(rows));
//   });
// };
// test();