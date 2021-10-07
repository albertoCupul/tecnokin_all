const jwt = require('jsonwebtoken');

const secret = 'd76657247ab20624c5133d41bd54588f';
const lifeTime = '1d';

function generate(obj) {
  const JwtObj = {
    user: obj.user,
    pwd: obj.pwd,
  };

  const token = jwt.sign(JwtObj, secret, { expiresIn: lifeTime });
  return token;
}

function compareToken(token) {
  try {
    if (!token) {
      return 2;
    }

    const dataDecoder = jwt.verify(token, secret);
    return dataDecoder;
  } catch (error) {
    return 3;
  }
}

module.exports.generate = generate;
module.exports.compareToken = compareToken;
