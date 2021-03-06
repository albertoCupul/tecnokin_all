const SchemaAccess = require("../../../public/javascript/modules/mongoDB/models/Users/access");

async function getAccessUser(valor, searchForId = false) {
  try {
    const Schema = new SchemaAccess();
    let filter = null;
    let data;
    if (!searchForId) {
      filter = { user: valor };
      data = await Schema.findOnePopulate(filter);
    } else {
      filter = { _id: valor };
      data = await Schema.findOne(filter);
    }

    if (!data) {
      return true;
    }
    return data;
  } catch (error) {
    return false;
  }
}

module.exports = getAccessUser;
