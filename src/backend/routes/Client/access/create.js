const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Clients/access');
const bcrypt = require('../../../public/javascript/modules/bycript/functions');
const middleware = require("../middleware");

async function create(object) {
  try {


    const Schema = new SchemaUser();
    Schema.user = object.user;
    const pwdEncrypted = await bcrypt.encryptPwd(object.pwd);
    Schema.pwd = pwdEncrypted;
    Schema.idClient = object.idClient;
    Schema.logStatus = false;
    return await Schema.save();
  } catch (error) {
    if (error.code === 11000) {
      return true;
    }
    return false;
  }
}

module.exports = create;
