const login = require('./login');
const jwt = require('../../../public/javascript/modules/webtoken/token');
const getAllUserData = require('../access/getAccessData');

function extractToken(bearerToken) {
  const token = bearerToken.split(' ')[1];
  return token;
}

function extractDataToken(token) {
  const dataLogin = jwt.compareToken(token);
  return dataLogin;
}

async function loginWithToken(bearerToken) {
  const token = await extractToken(bearerToken);
  const dataLogin = await extractDataToken(token);
  const response = await login(dataLogin, false);
  return response;
}

async function getAccessData(bearerToken, searchUserId = false) {
  const token = await extractToken(bearerToken);
  const dataLogin = await extractDataToken(token);
  if (searchUserId) {
    const userData = await getAllUserData(dataLogin.user);
    return userData;
  }
  return dataLogin;
}

module.exports.loginWithToken = loginWithToken;
module.exports.getAccessData = getAccessData;
