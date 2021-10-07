const bcrypt = require('bcrypt');

const saltRounds = 10;

function encryptPwd(password) {
  const hashPwd = bcrypt.hash(password, saltRounds);
  return hashPwd;
}

function comparePwd(password, hashPwd) {
  return bcrypt.compare(password, hashPwd);
}

module.exports.encryptPwd = encryptPwd;
module.exports.comparePwd = comparePwd;
