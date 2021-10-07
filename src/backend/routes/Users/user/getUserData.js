const SchemaUser = require('../../../public/javascript/modules/mongoDB/models/Users/usrMain');

async function getUserData(idUser) {
  try {
    const Schema = new SchemaUser();
    const filter = { _id: idUser };
    const data = await Schema.findOne(filter);
    return data;
  } catch (error) {
    return null;
  }
}

module.exports = getUserData;
