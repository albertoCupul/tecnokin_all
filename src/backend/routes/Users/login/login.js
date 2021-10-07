const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/access');
const bcrypt = require('../../../public/javascript/modules/bycript/functions');
const webToken = require('../../../public/javascript/modules/webtoken/token');

async function create(object, createToken = true) {
  try {
    const Schema = new SchemaUser();
    const filter = { user: object.user };
    const usrLogin = await Schema.findOne(filter);
    const samePwd = await bcrypt.comparePwd(object.pwd, usrLogin.pwd);
    if (!samePwd) {
      return 2;
    }

    usrLogin.logStatus = true;
    usrLogin.save();

    if (createToken) {
      const newToken = webToken.generate(object);
      return newToken;
    }
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = create;
